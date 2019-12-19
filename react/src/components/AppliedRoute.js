import React from "react";
import { Route } from "react-router-dom";

/* creates a Route where the child component that it renders contains the passed in props */ 

export default function AppliedRoute({ component: C, appProps, ...rest }) {
  return (
    <Route {...rest} render={props => <C {...props} {...appProps} />} />
  );
}