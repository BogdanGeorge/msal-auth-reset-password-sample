import React from "react";
import { MsalProvider } from "@azure/msal-react";
import { initializeMsalInstance, msalInstance, ResetFlowKey } from "./AuthenticationHelper";
import { AuthenticationProviderProps as AuthenticationProviderProps } from "./types";
import { useEffect } from "react";
import { EventType } from "@azure/msal-browser";
import { Routes } from "Routes";
import { useState } from "react";

function AuthenticationProvider(props: AuthenticationProviderProps) {
    const [isReady, setReady] = useState<boolean>(false);

    useEffect(() => {
        initializeMsalInstance();
        var callbackId = msalInstance?.addEventCallback((event) => {
            if (event.eventType === EventType.LOGIN_FAILURE && event.error?.message.includes(ResetFlowKey)) {
                window.location.href = Routes.ResetPassword;
            }
        });

        setReady(true);

        return () => {
            if (callbackId) {
                msalInstance?.removeEventCallback(callbackId);
            }
        };
    }, []);

    return <>{isReady && msalInstance !== null ? <MsalProvider instance={msalInstance}>{props.children}</MsalProvider> : null}</>;
}

export default AuthenticationProvider;
