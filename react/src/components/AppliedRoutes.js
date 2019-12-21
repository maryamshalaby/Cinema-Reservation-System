import React from "react";
import { Route } from "react-router-dom"; 


export default function AppliedRoute({ component: C, appProps, movieProps, ...rest }) {
  return (
    <Route {...rest} render={props => <C {...props} {...appProps} {...movieProps} />} />
  );
}