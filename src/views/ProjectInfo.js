import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useQuery, gql } from "@apollo/client";

import useAuth from "../hooks/useAuth";
import { GET_PROJECT_BY_ID } from "../graphql/queries/project";

const ProjectInfo = () => {
  // const history = useHistory();
  // const { isLoading, setIsLoading } = useAuth();

  const { loading, error, data } = useQuery(GET_PROJECT_BY_ID, {
    variables: { id: "619acf1ceb42542d68e677fe" },
  });

  console.log("loading", loading);
  console.log("error", error);
  console.log("data", data);

  return (
    <section>
      Update User
    </section>
  );
};

export default ProjectInfo;
