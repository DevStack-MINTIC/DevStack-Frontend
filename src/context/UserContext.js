import React, { createContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN, REGISTER } from "../graphql/mutations/auth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loginMutation] = useMutation(LOGIN);
  const [registerMutation] = useMutation(REGISTER);

  const [userSession, setUserSession] = useState(JSON.parse(sessionStorage.getItem("user")) || null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
    
  const contextValue = {
    userSession,
    error,
    isLoading,
    setIsLoading,
    register: async (registerInfo) => {
      setError(null);
      setIsLoading(true);
      try {
        await registerMutation({ variables: registerInfo });
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    login: async (email, password) => {
      setError(null);
      setIsLoading(true);
      try {
        const responseLogin = await loginMutation({
          variables: { email, password }
        });
        const { token, user } = JSON.parse(responseLogin.data.login);
        setUserSession(user);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
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
