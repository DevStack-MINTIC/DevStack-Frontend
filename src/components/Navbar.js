import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {

  // const { logout, isAdmin } = useAuth();

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
        <div className="collapse navbar-collapse" id="navbarNav">
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
            <li className="nav-item">
              <Link to="/update-user" className="nav-link">
                Actualizar Usuario
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
            <button className="btn btn-danger mx-3" onClick={() => {}}>
              Cerrar Sesión
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
