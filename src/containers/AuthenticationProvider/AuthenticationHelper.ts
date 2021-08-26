import { AccountInfo, PublicClientApplication, BrowserCacheLocation, Configuration, AuthenticationResult, LogLevel } from "@azure/msal-browser";

const FLUSH_ACCESS_FROM_ALL_TABS = "FLUSH_ACCESS_FROM_ALL_TABS";
const ResetFlowKey = "AADB2C90118";
const scopes: string[] = []; // TO BE CHANGED WITH REAL SCOPES
const msalConfiguration: Configuration = {
    auth: {
        clientId: "clientId", // TO BE CHANGED WITH REAL CLIENT ID
        authority: "authority", // TO BE CHANGED WITH REAL AUTHORITY
        knownAuthorities: ["kwnonAuthority"], // TO BE CHANGED WITH REAL KNOWN AUTHORITIES
        redirectUri: "http://localhost:3000/",
        postLogoutRedirectUri: "http://localhost:3000/signout"
    },
    system: {
        loggerOptions: {
            logLevel: LogLevel.Verbose,
            loggerCallback: (level: LogLevel, message: string) => {
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        break;
                    case LogLevel.Warning:
                        console.warn(message);
                        break;
                    default:
                        console.info(message);
                        break;
                }
            }
        }
    },
    cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage,
        storeAuthStateInCookie: true
    }
};

var msalInstance: PublicClientApplication | null = null;

export async function getAuthResponse(): Promise<AuthenticationResult | null> {
    try {
        let accounts = msalInstance?.getAllAccounts();
        if (accounts === undefined || accounts.length === 0) {
            return null;
        }

        var response = await msalInstance?.acquireTokenSilent({
            scopes: scopes,
            account: accounts[0]
        });

        if (response === undefined) {
            return null;
        }

        return response;
    } catch (error) {
        console.error("getAuthResponse error ", error);
        if (error && error.errorMessage && error.errorMessage.includes("AADB2C90077")) {
            await msalInstance?.acquireTokenRedirect({
                scopes: scopes
            });
        }
        return null;
    }
}

export async function getAccessToken(): Promise<string> {
    let authResponse = await getAuthResponse();
    return authResponse?.accessToken || "";
}

export function getAccount(): AccountInfo | null {
    let accounts = msalInstance?.getAllAccounts();
    if (accounts === undefined) {
        return null;
    }
    return accounts.length > 0 ? accounts[0] : null;
}

export async function logout(flushAccessFromAllTabs: boolean = true) {
    if (flushAccessFromAllTabs) {
        window.localStorage.setItem(FLUSH_ACCESS_FROM_ALL_TABS, new Date().getTime().toLocaleString());
        window.localStorage.removeItem(FLUSH_ACCESS_FROM_ALL_TABS);
    }
    await msalInstance?.logout();
}

export function initializeMsalInstance(): PublicClientApplication {
    msalInstance = new PublicClientApplication(msalConfiguration);
    window.addEventListener(
        "storage",
        async (event: StorageEvent) => {
            if (event.key === FLUSH_ACCESS_FROM_ALL_TABS) {
                await logout(false);
            }
        },
        false
    );

    return msalInstance;
}

export { msalInstance, scopes, ResetFlowKey };
