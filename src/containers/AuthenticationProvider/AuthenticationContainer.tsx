import React, { useEffect, useState } from "react";
import { MsalAuthenticationTemplate, useMsal, useAccount, IMsalContext, MsalAuthenticationResult } from "@azure/msal-react";
import { InteractionType, InteractionStatus, AuthenticationResult } from "@azure/msal-browser";
import LoadingScreen from "components/LoadingScreen";
import Error from "pages/Error";
import { getAuthResponse, ResetFlowKey, scopes } from "./AuthenticationHelper";
import { AuthenticationContainerProps, AuthenticationSuccessContainerProps } from "./types";
import { Routes } from "Routes";

function AuthenticationContainer(props: AuthenticationContainerProps) {
    return (
        <>
            {console.log("rendering MsalAuthenticationTemplate")}
            <MsalAuthenticationTemplate
                interactionType={InteractionType.Redirect}
                authenticationRequest={{ scopes: scopes }}
                errorComponent={AuthenticationErrorContainer}
                loadingComponent={AuthenticationLoadingContainer}
            >
                <AuthenticationSuccessContainer>{props.children}</AuthenticationSuccessContainer>
            </MsalAuthenticationTemplate>
        </>
    );
}

function AuthenticationLoadingContainer(msalContext: IMsalContext) {
    console.log("AuthenticationLoadingContainer", msalContext);
    return <LoadingScreen />;
}

function AuthenticationErrorContainer(msalResult: MsalAuthenticationResult) {
    console.warn("AuthenticationErrorContainer ", msalResult);
    if (msalResult.error?.errorMessage.includes(ResetFlowKey)) {
        console.log("AuthenticationErrorContainer redirecting to reset password");
        window.location.href = Routes.ResetPassword;
    }

    return <Error title={"Sorry for the inconvenience"} description={"We encounter a problem while trying to authenticate you."} />;
}

function AuthenticationSuccessContainer(props: AuthenticationSuccessContainerProps) {
    const [atsResponse, setAtsResponse] = useState<AuthenticationResult | null>(null);
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});

    useEffect(() => {
        console.info("authentication success");
        async function fetchAccess() {
            if (!atsResponse && account && inProgress === InteractionStatus.None) {
                const response = await getAuthResponse();
                setAtsResponse(response);
            }
        }
        fetchAccess();
    }, [account, inProgress, instance, atsResponse]);

    return <>{atsResponse ? props.children : null}</>;
}

export default AuthenticationContainer;
