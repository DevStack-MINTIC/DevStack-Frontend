import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_PROJECT } from "../graphql/mutations/project";
import useAuth from "../hooks/useAuth"

import "./ProjectInfo.scss";

const ProjectCreate = ({isOpen, onClose, refetchProjects}) => {
    const { setIsLoading } = useAuth();

  const context = { headers: { authorization: `Bearer ${sessionStorage.getItem("token")}` }};
  const [specificObjectivesCounter, setSpecificObjectivesCounter] = useState(1);
  const [createProgress] = useMutation(CREATE_PROJECT, { context });
  const handleCreateProgress = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const specificObjectives = [];
    for (let i = 0; i < specificObjectivesCounter; i++) {
      specificObjectives.push(e.target[`specificObjective${i}`].value);
    }
    await createProgress({
      variables: {
        name: e.target.name.value,
        generalObjective: e.target.generalObjective.value,
        specificObjectives,
        budget: e.target.budget.value, 
      },
    });
    await refetchProjects();
    onClose();
    setIsLoading(false);
  };

  return isOpen && (
    <div className="project-modal">
      <div className="project-modal__content rounded py-5 px-4">
        <div className="project-modal__close" onClick={onClose}>&times;</div>
        <div className="col-md-8 col-lg-6 col-xl-4 mx-auto">
          <h1 className="text-center">Crear proyecto</h1>
          <form onSubmit={(e) => handleCreateProgress(e)}>
            <div className="form-outline mb-2">
              <label className="form-label">Nombre del proyecto</label>
              <input type="text" name="name" className="form-control form-control-lg" placeholder="Digitar nombre del proyecto" required/>
            </div>

            <div className="form-outline mb-2">
              <label className="form-label">Objetivo general</label>
              <input type="text" name="generalObjective" className="form-control form-control-lg" placeholder="Digitar objetivo general" required/>
            </div>

            <div className="form-outline mb-2">
              <label className="form-label">Objetivos especificos</label>
              <div className="d-flex align-items-center">
                <input type="text" name="specificObjective0" className="form-control form-control-lg" placeholder="Digitar objetivo especifico" required/>
                <button type="button" className="btn btn-primary" onClick={() => setSpecificObjectivesCounter(specificObjectivesCounter + 1)}>+</button>
              </div>
              { Array.from(Array(specificObjectivesCounter - 1).keys()).map((i) => (
                <div className="d-flex align-items-center">
                  <input type="text" name={`specificObjective${i+1}`} className="form-control form-control-lg mt-2" placeholder="Digitar objetivo especifico" required/>
                  <button type="button" className="btn btn-primary" onClick={() => setSpecificObjectivesCounter(specificObjectivesCounter - 1)}>-</button>
                </div>
              ))}
            </div>

            <div className="form-outline mb-2">
              <label className="form-label">Presupuesto</label>
              <input type="number" name="budget" className="form-control form-control-lg" placeholder="Digitar presupuesto" required/>
            </div>

            <div className="text-center text-lg-start mt-4 pt-2">
              <button type="submit" className="btn btn-primary btn-lg">Crear proyecto</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreate;
