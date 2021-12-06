import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import App from "./App";
import { UserProvider } from "./context/UserContext";

import "./index.scss";

require('dotenv').config();

const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <UserProvider>
      <App />
    </UserProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
