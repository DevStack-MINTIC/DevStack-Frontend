import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLogin } = useAuth();

  return (
    <Route 
      {...rest}
      render={(props) =>
        isLogin()
          ? <Component {...props} /> 
          : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
