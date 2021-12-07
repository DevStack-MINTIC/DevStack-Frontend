import React, { useEffect, useState, forwardRef } from "react";
import { useQuery } from "@apollo/client";

import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import useAuth from "../hooks/useAuth"

import { GET_PROJECTS } from "../graphql/queries/project";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


const Projects = () => {
  const { setIsLoading } = useAuth();
  const [projects, setProjects] = useState([]);
  const { loading: loadingProjects, data: dataProjects } = useQuery(GET_PROJECTS);
  

  const columns = [
    { title: "_id", field: "_id", hidden: true, editable: "never" },
    { title: "Nombre", field: "name", editable: "never" },
    { 
      title: "Estado", 
      field: "status", 
      editable: "never",
      lookup: {
        ACTIVE: "Activo",
        INACTIVE: "Inactivo",
      },
    },
    { 
      title: "Fase", 
      field: "phase", 
      editable: "never",
      lookup: {
        STARTED: "Iniciando",
        IN_PROGRESS: "En progreso",
        FINISHED: "Finalizado",
      },
    },
    { title: "Lider", field: "leader", editable: "never" },
  ];

  // const handleRowUpdate = (newData, oldData, resolve) => {
  //   setIsLoading(true);
  //   const boolState = newData.state === 'true' ? true : false;
  //   updateProductById({
  //     uid: newData.uid,
  //     state: boolState,
  //     value: newData.value,
  //     name: newData.name,
  //   }).then(() => {
  //     const dataUpdate = [...dataProducts];
  //     const index = oldData.tableData.id;
  //     dataUpdate[index] = newData;
  //     setDataProducts([...dataUpdate]);
  //     resolve();
  //   }).finally(() => setIsLoading(false));
  // };

  // const handleCreateProduct = (newData, resolve) => {
  //   setIsLoading(true);
  //   const {name, value, state} = newData;
  //   const boolState = state === 'true' ? true : false;
  //   createProduct({
  //     name,
  //     value,
  //     state: boolState
  //   }).then((response) => {
  //     const dataUpdate = [...dataProducts];
  //     dataUpdate.push(response.product);
  //     setDataProducts([...dataUpdate]);
  //     resolve();
  //   }).finally(() => setIsLoading(false));
  // };

  useEffect(() => {
    console.log(dataProjects);
    const usersMap = dataProjects?.getProjects?.map((project) => {
      const {__typename, leader: { fullName }, ...restProject} = project;
      return {...restProject, leader: fullName};
    });
    setProjects(usersMap);
  }, [dataProjects]);

  useEffect(() => {
    setIsLoading(loadingProjects);
  }, [loadingProjects, setIsLoading]);

  return (
    <div className="container">
      <h1 className="my-3">Proyectos</h1>
      <MaterialTable
        title=""
        columns={columns}
        data={projects}
        icons={tableIcons}
        editable={{
          // onRowUpdate: (newData, oldData) =>
          //   new Promise((resolve) => {
          //     handleRowUpdate(newData, oldData, resolve);
          //   }),
          // onRowAdd: (newData) =>
          //   new Promise((resolve) => {
          //     handleCreateProduct(newData, resolve)
          //   }),
        }}
        options={{
          actionsColumnIndex: -1,
          sorting: true,
        }}
      />
    </div>
  );
};

export default Projects;