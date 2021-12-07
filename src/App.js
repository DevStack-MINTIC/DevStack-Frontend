import React, { useEffect, useState } from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./views/Login";
import Register from "./views/Register";
import Users from "./views/Users";
import UpdateUser from "./views/UpdateUser";
import Projects from "./views/Projects";
import Inscriptions from "./views/Inscriptions";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import useAuth from "./hooks/useAuth";
import Loader from "./components/Loader/Loader";
import ModalAlert from "./components/ModalAlert/ModalAlert";

const App = () => {
  const { isLoading, userSession, error } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(!!error);
  }, [error]);

  return (
    <div>
      <BrowserRouter>
        {userSession && <Navbar />}
        <Switch>
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/register" component={Register} />
          <PrivateRoute exact path="/users" component={Users} />
          <PrivateRoute exact path="/update-user" component={UpdateUser} />
          <PrivateRoute exact path="/projects" component={Projects} />
          <PrivateRoute exact path="/inscriptions" component={Inscriptions} />
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
        <Loader isShowLoading={isLoading} />
        <ModalAlert isOpen={isOpen} setIsOpen={setIsOpen} message={error} />
      </BrowserRouter>
    </div>
  );
};

export default App;
