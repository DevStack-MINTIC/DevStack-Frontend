import React, { createContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN, REGISTER } from "../graphql/mutations/auth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loginMutation, { loading: loadingLogin, error: errorLogin }] = useMutation(LOGIN);
  const [registerMutation, { loading: loadingRegister, error: errorRegister }] = useMutation(REGISTER);

  const [userSession, setUserSession] = useState(JSON.parse(sessionStorage.getItem("user")) || null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // useEffect(() => {
  //   // setError();
  //   console.log("errorLogin", errorLogin);
  //   console.log("errorRegister", errorRegister);
  // }, [errorLogin, errorRegister]);
    
  const contextValue = {
    userSession,
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
      const responseRegister = await registerMutation({
        variables: {
          email,
          identificationNumber, 
          fullName, 
          password, 
          role
        }
      });
      const { token, user } = JSON.parse(responseRegister);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
    },
    login: async () => {
      setError(null);
      const responseLogin = await loginMutation({
        variables: {  
          email: "felipelop254@gmail.com",
          password: "qwerty123"
        }
      });
      const { token, user } = JSON.parse(responseLogin.data.login);
      setUserSession(user);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
    },
    logout: () => {
      setError(null);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    },
    isLogin: () => !!userSession,
    isAdmin: () => userSession?.role === "ADMIN",
    isLeader: () => userSession?.role === "LEADER",
    isStudent: () => userSession?.role === "STUDENT",
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
