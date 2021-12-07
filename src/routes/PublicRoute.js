import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRoute = ({ component: Component, ...rest }) => {
  
  const { isLogin } = useAuth();

  return (
    <Route 
      {...rest}
      render={(props) =>
        !isLogin()
          ? <Component {...props} /> 
          : <Redirect to="/projects" />
      }
    />
  );
};

export default PublicRoute;
