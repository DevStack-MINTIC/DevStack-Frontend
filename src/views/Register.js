import React, { useState } from "react";
import { useHistory } from "react-router";

import useAuth from "../hooks/useAuth";

const Register = () => {
  const history = useHistory();
  const { login, error } = useAuth();

  return (
    <section>
      Register
    </section>
  );
};

export default Register;
