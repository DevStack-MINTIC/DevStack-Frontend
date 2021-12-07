import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Register = () => {
  const history = useHistory();
  const { register, error } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const registerInfo = {
      email: e.target.email.value,
      identificationNumber: e.target.identificationNumber.value,
      fullName: e.target.fullName.value,
      password: e.target.password.value, 
      role: e.target.role.value,
    };
    register(registerInfo);
    e.target.reset();
    if (!error) {
      history.push("/login");
    }
  };

  return (
    <section className="mt-5">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.png" className="img-fluid" alt="Sample" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-2">
                <input type="email" name="email" className="form-control form-control-lg" placeholder="Digitar email" required/>
                <label className="form-label">Dirección de correo electrónico</label>
              </div>

              <div className="form-outline mb-2">
                <input type="number" name="identificationNumber" className="form-control form-control-lg" placeholder="Digitar número de documento de identidad" required/>
                <label className="form-label">Documento de identidad</label>
              </div>

              <div className="form-outline mb-2">
                <input type="text" name="fullName" className="form-control form-control-lg" placeholder="Digitar nombre completo" required/>
                <label className="form-label">Nombre completo</label>
              </div>

              <div className="form-outline mb-2">
                <input type="password" name="password" className="form-control form-control-lg" placeholder="Digitar contraseña" required/>
                <label className="form-label">Contraseña</label>
              </div>

              <div className="form-outline mb-2">
                <select name="role" className="form-select form-select-lg">
                  <option value="STUDENT" selected>Estudiante</option>
                  <option value="ADMIN">Administrador</option>
                  <option value="LEADER">Lider</option>
                </select>
                <label className="form-label">Rol</label>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg" >Registrarse</button>
                <p className="small fw-bold mt-2 pt-1 mb-0">¿Ya tienes una cuenta?{" "}
                  <Link to="/login" className="link-danger">Login</Link>
                </p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
