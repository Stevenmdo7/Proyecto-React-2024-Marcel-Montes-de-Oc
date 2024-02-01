import React, { useState } from "react";
import { useCarrito } from "./context/CarritoContext";
import Swal from "sweetalert2";
import "./ProductCard.css";

const ProductCard = (props) => {
  const { agregarAlCarrito } = useCarrito();
  const [cantidad, setCantidad] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const handleAgregarAlCarrito = () => {
    agregarAlCarrito(
      {
        id: props.id,
        nombre: props.name,
        precio: props.price,
        imagen: props.img,
      },
      cantidad
    );

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Agregado al carrito",
      text: `Se ha agregado ${cantidad} ${props.name} al carrito.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleIncrementarCantidad = () => {
    setCantidad((prevCantidad) => Math.max(1, prevCantidad + 1));
  };

  const handleDecrementarCantidad = () => {
    setCantidad((prevCantidad) => Math.max(1, prevCantidad - 1));
  };

  return (
    <div
      className={`card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img className="product--image" src={props.img} alt="product image" />
      <h3>{props.name}</h3>
      <p className="price">${props.price}</p>
      <p>{props.description}</p>
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
    </div>
  );
};

export default ProductCard;
