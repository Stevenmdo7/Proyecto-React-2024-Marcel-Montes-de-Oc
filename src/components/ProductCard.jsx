import React, { useState } from "react";
import { useCarrito } from "./context/CarritoContext";
import Swal from 'sweetalert2';
import "./ProductCard.css";

const ProductCard = (props) => {
  const { agregarAlCarrito } = useCarrito();
  const [cantidad, setCantidad] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const handleAgregarAlCarrito = () => {
    agregarAlCarrito({
      id: props.id,
      nombre: props.name,
      precio: props.price,
      imagen: props.img
    }, cantidad);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Agregado al carrito",
      text: `Se ha agregado ${cantidad} ${props.name} al carrito.`,
      showConfirmButton: false,
      timer: 1500
    });
  };

  return (
    <div
      className={`card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img className="product--image" src={props.img} alt="product image" />
      <h2>{props.name}</h2>
      <p className="price">${props.price}</p>
      <p>{props.description}</p>
      <p>
        <label>Cantidad:</label>
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          min="1"
        />
      </p>
      <p>
        <button onClick={handleAgregarAlCarrito}>Agregar al carrito</button>
      </p>
    </div>
  );
};

export default ProductCard;
