import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import NotFound from "./containers/NotFound";

export default function Routes({ appProps }) {
    return (
        <Switch>
            <AppliedRoute path="/" exact component={Home} appProps={appProps} />
            <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
            <AppliedRoute path="/register" exact component={Register} appProps={appProps} />
            { /* Finally, catch all unmatched routes */ }
            <Route component={NotFound} />
        </Switch>
    );
}