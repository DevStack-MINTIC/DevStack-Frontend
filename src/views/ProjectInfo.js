import React from "react";
// import { useHistory } from "react-router";
import { useQuery } from "@apollo/client";

// import useAuth from "../hooks/useAuth";
import { GET_PROJECT_BY_ID } from "../graphql/queries/project";
import { GET_PROGRESS_BY_PROJECT_ID } from "../graphql/queries/progress";

import "./ProjectInfo.scss";
import { format, fromUnixTime } from "date-fns";
import { es } from "date-fns/locale";

const ProjectInfo = ({ projectId, onClose }) => {

  const { loading: loadingProject, data: dataProject } = useQuery(
    GET_PROJECT_BY_ID,
    {
      variables: { id: projectId },
    }
  );
  const { loading: loadingProgress, data: dataProgress } = useQuery(
    GET_PROGRESS_BY_PROJECT_ID,
    {
      variables: { projectId },
    }
  );
  const project = dataProject?.getProjectById;
  const progress = dataProgress?.getProgressByProjectId;

  return (
    <>
      {true && !loadingProject && (
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
                <div className="project__info col-sm-6">
                  <span>
                    <b>Fase: </b>
                    {
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
                <div className="project__progress col-sm-6">
                  <h4>Avances y observaciones</h4>
                  {!loadingProgress &&
                    progress.map((item) => (
                      <ul key={item._id}>
                        <li>{item.description}</li>
                        {item.observation ? (
                          <ul>
                            <li>{item.observation}</li>
                          </ul>
                        ) : (
                          <ul>
                            <li>
                              <a href="#">Añadir observación</a>
                            </li>
                          </ul>
                        )}
                      </ul>
                    ))}
                  <ul>
                    <li>
                      <a href="#">Añadir Avance</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectInfo;
