import React, { useState } from "react";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    login(email.value, password.value);
  };

  return (
    <section className="mt-5 pt-5">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.png" className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <input type="email" name="email" className="form-control form-control-lg" placeholder="Digitar email" required/>
                <label className="form-label">Dirección de correo electrónico</label>
              </div>

              <div className="form-outline mb-3">
                <input type="password" name="password" className="form-control form-control-lg" placeholder="Digitar contraseña" required/>
                <label className="form-label">Contraseña</label>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg" >Entrar al sistema</button>
                <p className="small fw-bold mt-2 pt-1 mb-0">¿No tienes una cuenta?{" "}
                  <Link to="/register" className="link-danger">Registrarse</Link>
                </p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
