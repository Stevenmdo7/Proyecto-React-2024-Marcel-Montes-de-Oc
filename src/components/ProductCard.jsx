import React, { useState } from "react";
import { useCarrito } from "./context/CarritoContext";
import Swal from "sweetalert2";
import "./ProductCard.css";

const ProductCard = (props) => {
  console.log("img2:", props.img2);
  const { agregarAlCarrito } = useCarrito();
  const [cantidad, setCantidad] = useState(1);
  const [selectedModel, setSelectedModel] = useState(props.model ? props.model[0] : null);
  const [isHovered, setIsHovered] = useState(false);

  const handleAgregarAlCarrito = () => {
    const nombreConModelo = selectedModel ? `${props.name} - ${selectedModel}` : props.name;

    agregarAlCarrito({
      id: props.id,
      nombre: nombreConModelo,
      precio: parseFloat(props.price),
      imagen: getCurrentImage(),
      model: selectedModel,
    }, cantidad);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Agregado al carrito",
      text: `Se ha agregado ${cantidad} ${nombreConModelo} al carrito.`,
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

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const getCurrentImage = () => {
    return props.img2 && props.showAlternateImage ? props.img2 : props.img;
  };

  return (
    <div
    className={`card ${isHovered ? "hovered" : ""}`}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    {props.img2 && (
      <>
        <button
          className="toggle-button left-arrow"
          onClick={() => props.onToggleAlternateImage(props.id)}
        >
          {"<"}
        </button>
        <button
          className="toggle-button right-arrow"
          onClick={() => props.onToggleAlternateImage(props.id)}
        >
          {">"}
        </button>
      </>
    )}

    <div className="product--image-container">
      <img className="product--image" src={getCurrentImage()} alt="product image" />
    </div>

    <h3>{props.name}</h3>
    <p className="price">${props.price}</p>
    <p>{props.description}</p>
    {props.model && props.model.length > 0 && (
      <div className="model-dropdown-container">
        <label htmlFor={`modelDropdown-${props.id}`}>Elige un modelo:</label>
        <select
          id={`modelDropdown-${props.id}`}
          value={selectedModel}
          onChange={handleModelChange}
        >
          {props.model.map((model, index) => (
            <option key={index} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>
    )}
    <div className="bottom-container">
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
  </div>
  );
};

export default ProductCard;
