import React from "react";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./AuthenticationHelper";
import { AuthenticationProviderProps as AuthenticationProviderProps } from "./types";

function AuthenticationProvider(props: AuthenticationProviderProps) {
    return (
        <>
            {console.log("AuthenticationProvider")}
            <MsalProvider instance={msalInstance}>{props.children}</MsalProvider>
        </>
    );
}

export default AuthenticationProvider;
