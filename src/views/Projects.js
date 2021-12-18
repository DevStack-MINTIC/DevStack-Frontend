import React, { useEffect, useState, forwardRef } from "react";
import { useMutation, useQuery } from "@apollo/client";

import MaterialTable, { MTableToolbar } from "material-table";
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
import Visibility from '@material-ui/icons/Visibility';
import Create from '@material-ui/icons/Create';

import useAuth from "../hooks/useAuth"

import { GET_PROJECTS } from "../graphql/queries/project";
import { APPROVE_PROJECT } from "../graphql/mutations/project";
import { GET_INSCRIPTIONS_BY_STUDENT_ID } from "../graphql/queries/inscription";
import { CREATE_INSCRIPTION } from "../graphql/mutations/inscription";
import ProjectInfo from "./ProjectInfo";
import ProjectCreate from "./ProjectCreate";

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
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  Visibility: forwardRef((props, ref) => <Visibility {...props} ref={ref} />)
};


const Projects = () => {
  const { setIsLoading, isStudent, isLeader, isAdmin } = useAuth();
  const [projects, setProjects] = useState([]);
  const [viewProjectId, setViewProjectId] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCreateProject, setIsCreateProject] = useState(false);

  const context = { headers: { authorization: `Bearer ${sessionStorage.getItem("token")}` }};
  const { loading: loadingProjects, data: dataProjects, refetch: refetchProjects } = useQuery(GET_PROJECTS);
  const { loading: loadingInscription, data: dataIncriptionsByStudentId, refetch: refetchInscription } = useQuery(GET_INSCRIPTIONS_BY_STUDENT_ID, { context });

  const [createInscription] = useMutation(CREATE_INSCRIPTION, { context });
  const handlecreateInscription = async (projectId) => {
    setIsLoading(true);
    await createInscription({
      variables: {
        projectId,
      },
    });
    await refetchInscription();
    setIsLoading(false);
  };

  const [approveProject] = useMutation(APPROVE_PROJECT, { context });
  const handleApproveProject = async (id) => {
    setIsLoading(true);
    await approveProject({
      variables: {
        id,
      },
    });
    await refetchProjects();
    setIsLoading(false);
  };

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
        null: "_",
        STARTED: "Iniciando",
        IN_PROGRESS: "En progreso",
        FINISHED: "Finalizado",
      },
    },
    { title: "Lider", field: "leader", editable: "never" },
  ];

  useEffect(() => {
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
    <>
      <div className="container">
        <h1 className="my-3">Proyectos</h1>
        { !loadingInscription && !loadingProjects && (
          <MaterialTable
            title=""
            columns={columns}
            data={projects}
            icons={tableIcons}
            actions={[
              {
                icon: "Visibility",
                tooltip: 'Visualizar',
                onClick: (rowData, isEnrolledStudent) => {
                  setViewProjectId(rowData._id);
                  setIsEnrolled(isEnrolledStudent);
                },
              },
              {
                icon: "Create",
                tooltip: 'Inscribirse',
                onClick: (rowData) => {
                  handlecreateInscription(rowData._id);
                },
              },
              {
                icon: "Check",
                tooltip: "Aceptar",
                onClick: (rowData) => {
                  handleApproveProject(rowData._id);
                }
              },
            ]}
            components={{
              Action: (props) => {
                if (props.action.icon === "Visibility") {
                  const isEnrolledStudent = dataIncriptionsByStudentId
                    ?.getInscriptionsByStudentId
                    .findIndex((inscription) => {
                      return (
                        inscription.projectId._id === props.data._id &&
                        inscription.status === "ACCEPTED"
                      )
                    });
                  return (
                    <Visibility 
                      className="cursor-pointer" 
                      onClick={() => props.action.onClick(props.data, isEnrolledStudent !== -1)} />
                  );
                }
                if (props.action.icon === "Create") {
                  const projectIDs = dataIncriptionsByStudentId
                    ?.getInscriptionsByStudentId
                    .map((inscription) => inscription.projectId._id);
                  const isEnrolledStudent = 
                    isStudent() && 
                    !projectIDs.includes(props.data._id) && 
                    props.data.status === "ACTIVE";
                  return isEnrolledStudent && (
                    <Create 
                      className="cursor-pointer" 
                      onClick={() => props.action.onClick(props.data)} />
                  )
                }
                if (props.action.icon === "Check") {
                  const isAdminApprove = isAdmin() && props.data.status === "INACTIVE";
                  return isAdminApprove && <Check className="cursor-pointer" onClick={() => props.action.onClick(props.data)} />;
                }
              },
              Toolbar: props => (
                <div>
                  <MTableToolbar {...props} />
                  {isLeader() && (
                    <button className="btn btn-primary mx-2" onClick={() => setIsCreateProject(true)}>Crear Proyecto</button>
                  )}
                </div>
              )
            }}
            options={{
              actionsColumnIndex: -1,
              sorting: true,
            }}
          />)}
      </div>
      { !!viewProjectId && (
        <ProjectInfo
          projectId={viewProjectId} 
          isEnrolled={isEnrolled} 
          onClose={setViewProjectId} />
      )}
      <ProjectCreate
        isOpen={isCreateProject}
        onClose={() => setIsCreateProject(false)}
        refetchProjects={refetchProjects}
      />
    </>
  );
};

export default Projects;