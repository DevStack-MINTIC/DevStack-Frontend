import React, { useEffect, useState, forwardRef } from "react";
import { useQuery, useMutation } from "@apollo/client";

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
import { GET_USERS } from "../graphql/queries/user";
import { UPDATE_USER_STATE } from "../graphql/mutations/user";

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

  const { setIsLoading, isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const { loading: loadingUsers, data: dataUsers, refetch } = useQuery(
    GET_USERS,
    {
      context: {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    });
  
  const [updateUserStatus] = useMutation(UPDATE_USER_STATE);
  const handleRowUpdate = async (newData, oldData, resolve) => {
    setIsLoading(true);
    await updateUserStatus({
      context: {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      },
      variables: {
        id: newData._id,
        state: newData.state,
      },
    });
    await refetch();
    resolve();
    setIsLoading(false);
  };

  const columns = [
    { title: "_id", field: "_id", hidden: true, editable: "never" },
    { title: "Nombre Completo", field: "fullName", editable: "never" },
    { title: "Documento de Identidad", field: "identificationNumber", editable: "never" },
    { title: "Email", field: "email", editable: "never" },
    { 
      title: "Rol", 
      field: "role", 
      editable: "never",
      lookup: {
        ADMIN: "Administrador",
        LEADER: "Lider",
        STUDENT: "Estudiante"
      },
    },
    {
      title: "Estado",
      field: "state",
      editable: "onUpdate",
      lookup: {
        PENDING: "Pendiente",
        AUTHORIZED: "Autorizado",
        ...(isAdmin() && { NOT_AUTHORIZED: "No Autorizado"})
      },
    },
  ];

  useEffect(() => {
    const usersMap = dataUsers?.getUsers?.map((user) => {
      const {__typename, ...restUser} = user;
      return restUser;
    });
    setUsers(usersMap);
  }, [dataUsers]);

  useEffect(() => {
    setIsLoading(loadingUsers);
  }, [loadingUsers, setIsLoading]);

  return (
    <div className="container">
      <h1 className="my-3">Usuarios</h1>
      {!loadingUsers && (
        <MaterialTable
          title=""
          columns={columns}
          data={users}
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
      )}
    </div>
  );
};

export default Users;
