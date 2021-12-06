import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {

  const { login, isLogin } = useAuth();

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="nav-item">
          {/* <Link className="navbar-brand" to="*">
            Devware Store
          </Link> */}
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Registro
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/users" className="nav-link">
                Usuarios
              </Link>
            </li>
            {/* {isAdmin() && (
            <> */}
              <li className="nav-item">
                <Link to="/projects" className="nav-link">
                  Proyectos
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/project-info" className="nav-link">
                  Información del Proyecto
                </Link>
              </li>
            {/* </>
            )} */}
            <li className="nav-item">
              <Link to="/inscriptions" className="nav-link">
                Inscripciones
              </Link>
            </li>
            <button className="btn btn-danger mb-3 mb-md-0 mx-3" onClick={() => login()}>
              Iniciar sesión
            </button>
          </ul>
          <div className="d-flex justify-content-center">
            <Link className="btn btn-primary text-center" to="/update-user">
              Mi perfil
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
