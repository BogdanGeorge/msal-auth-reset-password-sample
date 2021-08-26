import React from "react";
import AuthenticationContainer from "containers/AuthenticationProvider/AuthenticationContainer";
import About from "pages/About";
import Home from "pages/Home";
import { Route, Switch } from "react-router-dom";
import { Routes } from "Routes";

function ProtectedRoutes() {
    return (
        <AuthenticationContainer>
            <Switch>
                <Route path={Routes.Home} component={Home} />
                <Route path={Routes.About} component={About} />
            </Switch>
        </AuthenticationContainer>
    );
}

export default ProtectedRoutes;
