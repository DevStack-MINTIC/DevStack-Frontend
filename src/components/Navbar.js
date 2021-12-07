import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { logout, isStudent, isLeader } = useAuth();

  const handleLogout = () => {
    logout();
    document.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="nav-item">
          <Link className="navbar-brand" to="*">
            Devware Academy
          </Link>
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
              <Link to="/projects" className="nav-link">
                Proyectos
              </Link>
            </li>
            {!isStudent() && (
              <li className="nav-item">
                <Link to="/users" className="nav-link">
                  Usuarios
                </Link>
              </li>
            )}
            {isLeader() && (
              <li className="nav-item">
                <Link to="/inscriptions" className="nav-link">
                  Inscripciones
                </Link>
              </li>
            )}
            <button className="btn btn-danger mb-3 mb-md-0 mx-3" onClick={handleLogout}>
              Cerrar sesión
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
