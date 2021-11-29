import React, { useState } from "react";
import { useHistory } from "react-router";

import useAuth from "../hooks/useAuth";

const UpdateUser = () => {
  const history = useHistory();
  const { login, error } = useAuth();

  return (
    <section>
      Update User
    </section>
  );
};

export default UpdateUser;
