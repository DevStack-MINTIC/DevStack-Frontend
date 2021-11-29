import React, { useState } from "react";
import { useHistory } from "react-router";

import useAuth from "../hooks/useAuth";

const Login = () => {
  const history = useHistory();
  const { login, error } = useAuth();

  return (
    <section>
      Login
    </section>
  );
};

export default Login;
