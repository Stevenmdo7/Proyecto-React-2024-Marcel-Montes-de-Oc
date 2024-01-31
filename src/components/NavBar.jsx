import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartWidget from "./CartWidget";
import Dropdown from 'react-dropdown-select';
import "./NavBar.css";

const Navbar = ({ handleChange }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate(); 

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const options = [
    { value: '/catalogo', label: 'Catalogo' },
    { value: '/categorias', label: 'Categorías' },
    { value: '/contacto', label: 'Contacto' },
    { value: '/sobre_nosotros', label: 'Sobre nosotros' },
    { value: '/como-pagar', label: '¿Cómo Comprar?' }
    
  ];

  const dropdownStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#000',
      borderColor: '#555',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#000',
      color: '#fff',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#555' : '#000',
      color: '#fff',
    }),
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container" onMouseEnter={() => setMenuVisible(true)} onMouseLeave={() => setMenuVisible(false)}>
        <Link to="/" className={`navbar-brand ${menuVisible ? 'animate__slideInDown' : ''}`}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/fotos-de-ecommerce.appspot.com/o/logo.png?alt=media&token=f758922c-3327-4a69-9f28-6e619fefe9d7"
            alt="Logo de Maquillaje T y P"
            className="img-fluid"
          />
        </Link>
        <div className={`collapse navbar-collapse${menuVisible ? ' show' : ''}`} id="navbarNav">
          <div className="container justify-content-center">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={closeMenu}>
                  Inicio
                </Link>
              </li>
              <li >
                <Dropdown
                  options={options}
                  values={[]}
                  placeholder="Opciones..."
                  onChange={handleChange}
                  style={dropdownStyles}
                />
              </li>
              <div className="ml-auto">
                <CartWidget />
              </div>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
