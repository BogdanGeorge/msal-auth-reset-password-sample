import React, { Component } from "react";
import ResetPassword from "pages/ResetPassword";
import { Route, Switch } from "react-router-dom";
import { Routes } from "Routes";
import SignOut from "pages/SignOut";

class IndexPublic extends Component {
    render() {
        return (
            <Switch>
                <Route path={Routes.ResetPassword} component={ResetPassword} />
                <Route path={Routes.SignOut} component={SignOut} />
            </Switch>
        );
    }
}

export default IndexPublic;
