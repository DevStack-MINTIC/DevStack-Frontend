import React, { createContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN, REGISTER } from "../graphql/mutations/auth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [login, { loading: loadingLogin, error: errorLogin }] = useMutation(LOGIN);
  const [register, { loading: loadingRegister, error: errorRegister }] = useMutation(REGISTER);

  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(loadingLogin || loadingRegister || false);

  useEffect(() => {
    // setError();
    console.log("errorLogin", errorLogin);
    console.log("errorRegister", errorRegister);
  }, [errorLogin, errorRegister])

  const contextValue = {
    user,
    error,
    isLoading,
    setIsLoading,
    register: async ({
      email,
      identificationNumber, 
      fullName, 
      password, 
      role
    }) => {
      setError(null);
      const responseRegister = await register({
        variables: {
          email,
          identificationNumber, 
          fullName, 
          password, 
          role
        }
      });
      const { token, user } = JSON.parse(responseRegister);
      setUser(JSON.stringify(user));
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
    },
    login: async () => {
      setError(null);
      const responseLogin = await login({
        variables: {  
          email: "felipelop254@gmail.com",
          password: "qwerty123"
        }
      });
      const { token, user } = JSON.parse(responseLogin);
      setUser(JSON.stringify(user));
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
    },
    logout: () => {
      setUser(null);
      setError(null);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    },
    isLogin: () => !!user,
    isAdmin: () => user?.role === "ADMIN",
    isLeader: () => user?.role === "LEADER",
    isStudent: () => user?.role === "STUDENT",
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
