import React, { useState } from "react";
import { useHistory } from "react-router";

import useAuth from "../hooks/useAuth";

const UpdateUser = () => {
  const history = useHistory();
  const { login, error } = useAuth();

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img className="rounded-circle mt-5" src="https://i.imgur.com/O1RmJXT.jpg" width="90"/>
            <span className="font-weight-bold">John Sanchez</span>
            <span className="text-black-50">Administrador</span>
            <span></span>
          </div>
        </div>
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Editar Perfil</h4>
            </div>
            <div className="row mt-2">
              <div>
                <label className="labels">Nombre Completo</label>
                <input type="text" className="form-control" placeholder="Nombre Completo"/>
              </div>
            </div>
            <div className="row mt-3">
                <div>
                  <label className="labels">Documento de Identidad</label>
                  <input type="text" className="form-control" placeholder="Documento de Identidad"/>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Email</label>
                    <input type="email" className="form-control" placeholder="email@example.com"/>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Constraseña</label>
                    <input type="password" className="form-control" placeholder="Contraseña" />
                  </div>
                </div>
            </div>
            <fieldset disabled>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label className="labels">Rol</label>
                  <input type="text" className="form-control" placeholder="Role" value=""/>
                </div>
                <div className="col-md-6">
                  <label className="labels">Estado</label>
                  <input type="text" className="form-control" placeholder="State"/>
                </div>
              </div>
            </fieldset>
            <div className="mt-5 text-center">
              <button className="btn btn-primary" type="submit" value="Submit">
                Actualizar Perfil
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
            
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
