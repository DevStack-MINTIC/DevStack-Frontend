import React, { useEffect, useState, forwardRef } from "react";
import { useQuery } from "@apollo/client";
import useAuth from "../hooks/useAuth";

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

import { GET_INSCRIPTIONS } from "../graphql/queries/inscription";


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

const Inscriptions = () => {
  const { setIsLoading } = useAuth();
  const [inscriptions, setIncriptions] = useState([]);
  const { loading: loadingIncriptions, data: dataIncriptions } = useQuery(
    GET_INSCRIPTIONS,
    {
      context: {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    });

  const columns = [
    { title: "_id", field: "_id", hidden: true, editable: "never" },
    { title: "Proyecto", field: "projectName", editable: "never" },
    { title: "Estudiante", field: "studentName", editable: "never" },
    { 
      title: "Estado", 
      field: "status", 
      editable: "never",
      lookup: {
        null: "Pendiente",
        ACCEPTED: "Aceptado",
        REJECTED: "Recchazado",
      },
    },
    { title: "Admisión", field: "admissionDate", editable: "never" },
    { title: "Salida", field: "departureDate", editable: "never" },
  ];

  // const handleRowUpdate = (newData, oldData, resolve) => {
  //   const dataUpdate = [...dataProducts];
  //   const index = oldData.tableData.id;
  //   dataUpdate[index] = newData;
  //   setDataProducts([...dataUpdate]);
  //   resolve();
  // };

  // const handleCreateSale = () => {
  //   setIsLoading(true);
  //   const products = dataProducts
  //     .filter((product) => product.amount > 0)
  //     .map((product) => {
  //       const { tableData, state, ...rest } = product;
  //       return rest;
  //     });
  //   createSale({
  //     products,
  //     salesManager: user.email,
  //   }).then((response) => {
  //     getAllProducts();
  //   }).finally(() => setIsLoading(false));
  // };

  useEffect(() => {
    const usersMap = dataIncriptions?.getInscriptions?.map((inscription) => {
      const {__typename, projectId: { name }, studentId: { fullName }, ...restIncription} = inscription;
      return {...restIncription, projectName: name, studentName: fullName };
    });
    setIncriptions(usersMap);
  }, [dataIncriptions]);

  useEffect(() => {
    setIsLoading(loadingIncriptions);
  }, [loadingIncriptions, setIsLoading]);

  return (
    <div className="container">
      <h1 className="my-3">Inscripciones</h1>
      <MaterialTable
        title=""
        columns={columns}
        data={inscriptions}
        icons={tableIcons}
        editable={{
          // onRowUpdate: (newData, oldData) =>
          //   new Promise((resolve) => {
          //     handleRowUpdate(newData, oldData, resolve);
          //   }),
        }}
        options={{
          actionsColumnIndex: -1,
        }}
      />
    </div>
  );
};

export default Inscriptions;
