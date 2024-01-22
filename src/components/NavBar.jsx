import React from "react";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import "./NavBar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand mx-auto">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/fotos-de-ecommerce.appspot.com/o/logo.png?alt=media&token=18ac17f8-5818-4360-8dbb-5e2a8c951701"
            alt="Logo de Maquillaje T y P"
            className="img-fluid"
          />
        </Link>
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
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/categorias" className="nav-link">
                Categorías
              </Link>
            </li>
            {/* Nuevo botón para Contacto */}
            <li className="nav-item">
              <Link to="/contacto" className="nav-link">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
        <div className="d-flex">
          <CartWidget />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
