import React, { useState } from "react";
import { useCarrito } from "./context/CarritoContext";
import Swal from "sweetalert2";
import "./Product.scss";
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
      timer: 1500,
    });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleIncrementarCantidad = () => {
    setCantidad((prevCantidad) => Math.max(1, prevCantidad + 1));
  };

  const handleDecrementarCantidad = () => {
    setCantidad((prevCantidad) => Math.max(1, prevCantidad - 1));
  };

  const imagenes = [
    "https://firebasestorage.googleapis.com/v0/b/fotos-de-ecommerce.appspot.com/o/Background%2Faugustine-wong-T0BYurbDK_M-unsplash.jpg?alt=media&token=08cc9e4c-5fe2-4555-92f4-0e9a53cdde3a",
  ];

  const imagenAleatoria = imagenes[Math.floor(Math.random() * imagenes.length)];

  return (
    <div className="product-container">
      <div
        className="product"
        style={{ backgroundImage: `url(${imagenAleatoria})` }}
      >
        <img
          src={imagen}
          alt={nombre}
          onClick={openModal}
          className="product-image"
        />

        <h3>{nombre}</h3>

        <p>Precio: ${precio}</p>

        <div className="cantidad-container">
          <button className="square-button" onClick={handleDecrementarCantidad}>
            -
          </button>
          <span className="cantidad">{cantidad}</span>
          <button className="square-button" onClick={handleIncrementarCantidad}>
            +
          </button>
        </div>

        <button className="button" onClick={handleAgregarAlCarrito}>
          <div>
            <span>Agregar al carrito</span>
          </div>
        </button>

        <button className="button" onClick={openModal}>
          <div>
            <span>Ver Detalle</span>
          </div>
        </button>

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
