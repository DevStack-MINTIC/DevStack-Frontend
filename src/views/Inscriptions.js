import React, { useEffect, useState, forwardRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { format, fromUnixTime } from "date-fns";
import { es } from "date-fns/locale";

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
import { APPROVE_INSCRIPTION } from "../graphql/mutations/inscription";


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
  const context = { headers: { authorization: `Bearer ${sessionStorage.getItem("token")}` }};
  const { loading: loadingIncriptions, data: dataIncriptions, refetch} = useQuery(GET_INSCRIPTIONS, { context });

  const [approveInscription] = useMutation(APPROVE_INSCRIPTION, { context });
  const handleApproveInscription = async (id, status) => {
    setIsLoading(true);
    await approveInscription({
      variables: {
        id,
        status,
      },
    });
    await refetch();
    setIsLoading(false);
  };

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
        REJECTED: "Rechazado",
      },
    },
    { title: "Admisión", field: "admissionDate", editable: "never" },
    { title: "Salida", field: "departureDate", editable: "never" },
  ];

  useEffect(() => {
    const usersMap = dataIncriptions?.getInscriptions?.map((inscription) => {
      let {
        __typename, 
        projectId: { name }, 
        studentId: { fullName }, 
        admissionDate,
        departureDate,
        ...restIncription} = inscription;
        admissionDate = admissionDate ? format(fromUnixTime(admissionDate / 1000), "dd/MMMM/yyyy", { locale: es }) : null;
        departureDate = departureDate ? format(fromUnixTime(departureDate / 1000), "dd/MMMM/yyyy", { locale: es }) : null;
      return {...restIncription, projectName: name, studentName: fullName, admissionDate, departureDate};
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
        actions={[
          {
            icon: "Check",
            tooltip: "Aceptar",
            onClick: (rowData) => {
              handleApproveInscription(rowData._id, "ACCEPTED");
            }
          },
          {
            icon: "Clear",
            tooltip: "Rechazar",
            onClick: (rowData) => {
              handleApproveInscription(rowData._id, "REJECTED");
            }
          },
        ]}
        components={{
          Action: (props) => {
            if (props.action.icon === "Check") {
              return !props.data.status && <Check className="cursor-pointer" onClick={() => props.action.onClick(props.data)} />;
            }
            if (props.action.icon === "Clear") {
              return !props.data.status && <Clear className="cursor-pointer" onClick={() => props.action.onClick(props.data)} />;
            }
          }
        }}
        options={{
          actionsColumnIndex: -1,
        }}
      />
    </div>
  );
};

export default Inscriptions;
