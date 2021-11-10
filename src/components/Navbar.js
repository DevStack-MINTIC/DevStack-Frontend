import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {

  const { logout, isAdmin } = useAuth();

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="nav-item">
          <Link className="navbar-brand" to="/">
            Devware Store
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Vender
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                Ventas
              </Link>
            </li>
            {isAdmin() && (
            <>
              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user-management" className="nav-link">
                  Usuarios
                </Link>
              </li>
            </>
            )}
            <button className="btn btn-danger mx-3" onClick={logout}>
              Cerrar Sesión
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
