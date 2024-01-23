import React, { useState } from "react";
import { useCarrito } from "./context/CarritoContext";
import Swal from 'sweetalert2';  
import "./Product.css";
import DetallesProductoContainer from "./DetallesProductoContainer"; 

const Product = ({ id, nombre, descripcion, precio, imagen }) => {
  const { agregarAlCarrito } = useCarrito();
  const [cantidad, setCantidad] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleAgregarAlCarrito = () => {
    agregarAlCarrito({ id, nombre, precio, imagen }, cantidad);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Agregado al carrito",
      text: `Se ha agregado ${cantidad} ${nombre} al carrito.`,
      showConfirmButton: false,
      timer: 1500
    });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="product-container">
      <div className="product">
        <img
          src={imagen}
          alt={nombre}
          onClick={openModal}
          className="product-image"
        />

        <h3>{nombre}</h3>

        <p>Precio: ${precio}</p>

        <div>
          <label>Cantidad:</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            min="1"
          />
        </div>

        <button onClick={handleAgregarAlCarrito}>Agregar al carrito</button>

        <button onClick={openModal}>Ver Detalle</button>

        {modalIsOpen && (
          <DetallesProductoContainer
            producto={{ id, nombre, descripcion, precio, imagen }}
            closeModal={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default Product;