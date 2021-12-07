import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import useAuth from "../hooks/useAuth";

import { GET_USER_BY_ID } from "../graphql/queries/user";
import { UPDATE_USER } from "../graphql/mutations/user";

const UpdateUser = () => {
  const { setIsLoading, userSession } = useAuth();
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const { loading: loadingUser, data: dataUser, refetch} = useQuery(
    GET_USER_BY_ID, 
    {
      context: {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      },
      variables: { id: userSession.id }
    }
  );  
  const [updateUser] = useMutation(UPDATE_USER);
  const handleSubmit = async () => {
    setIsLoading(true);
    await updateUser({
      context: {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      },
      variables: {
        ...(!!name && { fullName: name }),
        ...(!!pass && { password: pass }),
      },
    });
    await refetch();
    setName("");
    setPass("");
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(loadingUser);
  }, [loadingUser, setIsLoading]);

  const user = dataUser?.getUserById;

  return !loadingUser && (
    <div className="container rounded bg-white">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img className="rounded-circle mt-5" src="https://i.imgur.com/O1RmJXT.jpg" width="90" alt=""/>
              <span className="font-weight-bold">{user.fullName}</span>
              <span className="text-black-50">
                {
                  user.role === "ADMIN" ? "Administrador" : null || 
                  user.role === "LEADER" ? "Lider" : null || 
                  user.role === "STUDENT" ? "Estudiante" : null
                }
              </span>
              <span></span>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Editar Perfil</h4>
              </div>
              <div className="row">
                <div className="mb-3">
                  <label className="labels">Nombre Completo</label>
                  <input type="text" className="form-control" placeholder={user.fullName} required value={name} onChange={(e) => setName(e.target.value)}/>
                </div> 
                <div className="mb-3">
                  <label className="labels">Documento de Identidad</label>
                  <input type="text" className="form-control" placeholder="Documento de Identidad" value={user.identificationNumber} readOnly/>
                </div>
                <div className="mb-3">
                  <label className="labels">Email</label>
                  <input type="email" className="form-control" placeholder="email@example.com" value={user.email} readOnly/>
                </div>
                <div className="mb-3">
                  <label className="labels">Constraseña</label>
                  <input type="password" className="form-control" placeholder="•••••••••••••" value={pass} onChange={(e) => setPass(e.target.value)} />
                </div>
                <div className="mb-4">
                  <label className="labels">Rol</label>
                  <input type="text" className="form-control" placeholder="Role" value={
                    user.role === "ADMIN" ? "Administrador" : null || 
                    user.role === "LEADER" ? "Lider" : null || 
                    user.role === "STUDENT" ? "Estudiante" : null
                  } readOnly/>
                </div>
                <div className="text-center">
                  <button className="btn btn-primary" onClick={handleSubmit} disabled={!(name || pass)}>
                    Actualizar Perfil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default UpdateUser;
