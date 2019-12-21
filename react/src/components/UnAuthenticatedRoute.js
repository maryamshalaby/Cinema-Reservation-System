import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function UnAuthenticatedRoute({ component: C, appProps, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        appProps.isAuthenticated === "false"
          ? <C {...props} {...appProps} />
          : <Redirect to="/movies" />}
    />
  );
}