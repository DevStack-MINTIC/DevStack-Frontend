import React, { useState } from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import MaterialTable from 'material-table'

function App (){
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
        <div className= "App">
            <h1 align = "center">Gestión estado inscripción</h1>
            <MaterialTable columns = {columns} data = {tableData } />
        </div>
     );
    };
    
    export default App;

