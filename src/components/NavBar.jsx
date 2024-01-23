import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import "./NavBar.css";

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    setMenuVisible(true);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/fotos-de-ecommerce.appspot.com/o/logo.png?alt=media&token=18ac17f8-5818-4360-8dbb-5e2a8c951701"
            alt="Logo de Maquillaje T y P"
            className="img-fluid"
          />
        </Link>
        <div className={`collapse navbar-collapse${menuVisible ? ' show' : ''}`} id="navbarNav">
          <div className="container justify-content-center"> {/* Modificación aquí */}
            <ul className="navbar-nav">
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
              <li className="nav-item">
                <Link to="/contacto" className="nav-link">
                  Contacto
                </Link>
              </li>
            </ul>
            <div className="ml-auto">
              <CartWidget />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
