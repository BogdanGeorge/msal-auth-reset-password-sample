import React, { Component } from "react";
import ProtectedRoutes from "containers/ProtectedRoutes/ProtectedRoutes";
import { Route, Switch } from "react-router-dom";

class IndexPrivate extends Component {
    render() {
        return (
            <Switch>
                <Route path="*" component={ProtectedRoutes} />
            </Switch>
        );
    }
}

export default IndexPrivate;
