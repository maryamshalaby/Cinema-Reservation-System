import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute  from "./components/AppliedRoutes";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnAuthenticatedRoute from "./components/UnAuthenticatedRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Admin from "./containers/Admin";
import AddMovie from "./containers/AddMovie";
import Movies from "./containers/Movies";
import Seats from "./containers/Seats"
import NotFound from "./containers/NotFound";

export default function Routes({ appProps }) {
    return (
        <Switch>
            <AppliedRoute path="/" exact component={Home} appProps={appProps}/>
            <UnAuthenticatedRoute path="/login" exact component={Login} appProps={appProps}/>
            <UnAuthenticatedRoute path="/register" exact component={Register} appProps={appProps}/>
            <AuthenticatedRoute path="/movies" exact component={Movies} appProps={appProps}/>
            <AuthenticatedRoute path="/seats" exact component={Seats} appProps={appProps}/>
            <AuthenticatedRoute path="/admin" exact component={Admin} appProps={appProps}/>
            <AuthenticatedRoute path="/addmovie" exact component={AddMovie} appProps={appProps}/>
            { /* Finally, catch all unmatched routes */ }
            <Route component={NotFound}/>
        </Switch>
    );
}