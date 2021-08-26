import AuthenticationProvider from "containers/AuthenticationProvider/AuthenticationProvider";
import React from "react";

interface Props {
    children: React.ReactNode;
}

function Application(props: Props) {
    // in real life app used to get configuration initialize app insights
    return <AuthenticationProvider>{props.children}</AuthenticationProvider>;
}

export default Application;
