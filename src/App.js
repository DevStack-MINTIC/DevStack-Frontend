import React, { useState } from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import MaterialTable from 'material-table'

import Navbar from "./components/Navbar";
import Login from "./views/Login";
import Register from "./views/Register";
import Users from "./views/Users";
import UpdateUser from "./views/UpdateUser";
import Projects from "./views/Projects";
import ProjectInfo from "./views/ProjectInfo";
import Inscriptions from "./views/Inscriptions";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import useAuth from "./hooks/useAuth";
import Loader from "./components/Loader/Loader";

const App = () => {
  // const { user, sLoading } = useAuth();
  const [tableData, setTableData] = useState([])
  const columns = [
    {title : "Proyecto", field: "proyecto"},
    {title : "Estudiante", field: "estudiante"},
    {title : "Estado ", field: "estado"},
    {title : "Fecha", field: "fecha"},
    {title : "Fecha", field: "fecha2"},
    {title : "Acciones", field: "acciones"},
  ]
  return (
    <div>
      <BrowserRouter>
        {/* {user && <Navbar />} */}
        <Navbar />
        <Switch>
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/register" component={Register} />
          <PublicRoute exact path="/users" component={Users} />
          <PublicRoute exact path="/update-user" component={UpdateUser} />
          <PublicRoute exact path="/projects" component={Projects} />
          <PublicRoute exact path="/project-info" component={ProjectInfo} />
          <PublicRoute exact path="/inscriptions" component={Inscriptions} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
        {/* <Loader isShowLoading={isLoading} /> */}
      </BrowserRouter>
    <MaterialTable columns = {columns} data = {tableData } />
    </div>
  );
};

export default App;
