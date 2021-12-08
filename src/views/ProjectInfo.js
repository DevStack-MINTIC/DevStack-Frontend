import React, { useState } from "react";
import useAuth from "../hooks/useAuth"
import { useMutation, useQuery } from "@apollo/client";

import { GET_PROJECT_BY_ID } from "../graphql/queries/project";
import { GET_PROGRESS_BY_PROJECT_ID } from "../graphql/queries/progress";
import { CREATE_PROGRESS, UPDATE_OBSERVATION } from "../graphql/mutations/progress";

import "./ProjectInfo.scss";
import { format, fromUnixTime } from "date-fns";
import { es } from "date-fns/locale";

const ProjectInfo = ({ projectId, isEnrolled, onClose }) => {
  const { setIsLoading, isStudent, isLeader, userSession} = useAuth();
  const context = { headers: { authorization: `Bearer ${sessionStorage.getItem("token")}` }};
  const [isNewProgress, setIsNewProgress] = useState(false);
  const [textareaContent, setTextareaContent] = useState("");

  const { loading: loadingProject, data: dataProject, refetch: refetchProject } = useQuery(
    GET_PROJECT_BY_ID,
    {
      variables: { id: projectId },
    }
  );
  const { loading: loadingProgress, data: dataProgress, refetch: refetchProgress } = useQuery(
    GET_PROGRESS_BY_PROJECT_ID,
    {
      variables: { projectId },
    }
  );
  
  const [createProgress] = useMutation(CREATE_PROGRESS, { context });
  const handleCreateProgress = async () => {
    setIsLoading(true);
    await createProgress({
      variables: {
        projectId,
        description: textareaContent,
      },
    });
    await refetchProject();
    await refetchProgress();
    setIsLoading(false);
    setIsNewProgress(false);
    setTextareaContent("");
  };

  const project = dataProject?.getProjectById;
  const progress = dataProgress?.getProgressByProjectId;
  const isOwnerLeader = isLeader() && project?.leader?._id === userSession.id;
  const isEnrolledStudent = isStudent() && isEnrolled;

  return (
    <>
      {!loadingProject && (
        <div className="project-modal">
          <div className="project-modal__content rounded">
            <div className="project-modal__close" onClick={() => onClose("")}>
              &times;
            </div>
            <div className="project">
              <h3 className="text-center mb-4">
                {project.name}
                {" - "}
                <span
                  className={
                    project.status === "ACTIVE" ? "text-success" : "text-danger"
                  }
                >
                  {project.status === "ACTIVE" ? "ACTIVO" : "INACTIVO"}
                </span>
              </h3>
              <div className="row">
                <div className={`project__info ${project.status === "ACTIVE" ? "col-sm-6" : "col-sm-12"}`}>
                  <span>
                    <b>Fase: </b>
                    {
                      project.phase === null ? "PENDIENTE APROBACIÓN" : null || 
                      project.phase === "STARTED" ? "INICIADO" : null || 
                      project.phase === "IN_PROGRESS" ? "EN PROGRESO" : null || 
                      project.phase === "FINISHED" ? "FINALIZADO" : null
                    }
                  </span>
                  {" | "}
                  <span>
                    <b>Presupuesto: </b>
                    {new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 0,
                    }).format(project.budget)}
                  </span>
                  <div className="mb-3">
                    {project.startDate && (
                      <p className="mb-0">
                        <b>Fecha de inicio: </b>
                        {format(
                          fromUnixTime(project.startDate / 1000),
                          "dd/MMMM/yyyy",
                          { locale: es }
                        )}
                      </p>
                    )}
                    {project.endDate && (
                      <p className="mb-0">
                        <b>Fecha de finalización: </b>
                        {format(
                          fromUnixTime(project.endDate / 1000),
                          "dd/MMMM/yyyy",
                          { locale: es }
                        )}
                      </p>
                    )}
                  </div>
                  <h4>Objetivos</h4>
                  <h5>General</h5>
                  <ul>
                    <li>{project.generalObjective}</li>
                  </ul>
                  <h5>Especificos</h5>
                  <ul>
                    {project.specificObjectives.map(
                      (specificObjective, index) => (
                        <li key={index}>{specificObjective}</li>
                      )
                    )}
                  </ul>
                  {/* <div>
                    <h4>Integrantes del proyecto</h4>
                    <div></div>
                  </div> */}
                </div>
                { project.status === "ACTIVE" && (
                  <div className="project__progress col-sm-6">
                    <h4>Avances y observaciones</h4>
                    {!loadingProgress &&
                      progress.map((item) => (
                        <ul key={item._id}>
                          <li>{item.description}</li>
                          {item.observation ? (
                            <ul><li>{item.observation}</li></ul>
                          ) : (
                            <>
                              { isOwnerLeader && (
                                <ul>
                                  { true ? 
                                    (<textarea className="w-100"/>) :
                                    (<li><a href="#" onClick={() => {}}>Añadir observación</a></li>)
                                  }
                                </ul>
                              )}
                            </>
                          )}
                        </ul>
                      ))}
                    { isEnrolledStudent && (
                      <ul>
                        { isNewProgress ? 
                          (
                            <>
                              <textarea 
                                className="w-100" 
                                value={textareaContent} 
                                onChange={(e) => setTextareaContent(e.target.value)}/>
                              <div>
                                <button 
                                  className="btn btn-secondary" 
                                  onClick={() => setIsNewProgress(false)}>
                                    Cancelar
                                </button>
                                <button 
                                  className="btn btn-primary" 
                                  onClick={() => handleCreateProgress()}>
                                    Guardar
                                </button>
                              </div>
                            </>    
                          ) :
                          (<li><a href="#" onClick={() => setIsNewProgress(true)}>Añadir avance</a></li>)
                        }
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectInfo;
