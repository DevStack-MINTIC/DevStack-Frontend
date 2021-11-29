import React, { useEffect, useState, forwardRef } from "react";

import MaterialTable from "material-table";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Search from "@material-ui/icons/Search";

import useAuth from "../hooks/useAuth"
import { getUsers, updateUserById } from "../services/users";

const tableIcons = {
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
};

const Users = () => {

  const { setIsLoading } = useAuth();
  const [dataUsers, setDataUsers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getUsers().then((data) => {
      setDataUsers(data?.users);
    }).finally(() => setIsLoading(false));
  }, []);
  
  const columns = [
    { title: "uid", field: "uid", hidden: true, editable: "never" },
    { title: "Email", field: "email", editable: "never" },
    { 
      title: "Rol", 
      field: "role", 
      editable: "onUpdate",
      lookup: {
        ADMIN: "Administrador",
        SELLER: "Vendedor"
      },
    },
    {
      title: "Estado",
      field: "state",
      editable: "onUpdate",
      lookup: {
        PENDING: "Pendiente",
        AUTHORIZED: "Autorizado",
        NO_AUTHORIZED: "No Autorizado",
      },
    },
  ];

  const handleRowUpdate = (newData, oldData, resolve) => {
    setIsLoading(true);
    updateUserById({
      uid: newData.uid,
      state: newData.state,
      role: newData.state,
    }).then(() => {
      const dataUpdate = [...dataUsers];
      const index = oldData.tableData.id;
      dataUpdate[index] = newData;
      setDataUsers([...dataUpdate]);
      resolve();
    }).finally(() => setIsLoading(false));
  };

  return <div className="container">
      <h1 className="my-3">Usuarios</h1>
      <MaterialTable
        title=""
        columns={columns}
        data={dataUsers}
        icons={tableIcons}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
        }}
        options={{
          actionsColumnIndex: -1,
          sorting: true,
        }}
      />

        

    </div>
  ;
};

export default Users;
