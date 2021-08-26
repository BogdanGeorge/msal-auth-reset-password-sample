import React, { lazy, Suspense } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import ReactDOM from "react-dom";
import Application from "containers/Application/Application";
import LoadingScreen from "components/LoadingScreen";

import "./index.css";
import { Routes } from "Routes";

const IndexPrivate = lazy(() => import("./indexPrivate"));
const IndexPublic = lazy(() => import("./indexPublic"));
const browserHistory = createBrowserHistory();

ReactDOM.render(
    <React.StrictMode>
        <Application>
            <Suspense fallback={<LoadingScreen />}>
                <Router history={browserHistory}>
                    <Switch>
                        <Route path={[Routes.ResetPassword, Routes.SignOut]} component={IndexPublic} />
                        <Route path="*" component={IndexPrivate} />
                    </Switch>
                </Router>
            </Suspense>
        </Application>
    </React.StrictMode>,
    document.getElementById("root")
);
