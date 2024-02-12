import React, { useState } from "react";
import Modal from "react-modal";
import { useCarrito } from "./context/CarritoContext";
import Swal from "sweetalert2";
import "./DetallesProductoContainer.css";

const DetallesProductoContainer = ({ producto, closeModal }) => {
  const { agregarAlCarrito } = useCarrito();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedModel, setSelectedModel] = useState(
    producto.modelos ? producto.modelos[0] : null
  );
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomStartPosition, setZoomStartPosition] = useState({ x: 0, y: 0 });
  const [cantidad, setCantidad] = useState(1);

  const handleToggleImage = (direction) => {
    const newIndex =
      direction === "right" ? currentImageIndex + 1 : currentImageIndex - 1;
    setCurrentImageIndex((prevIndex) => {
      if (newIndex < 0) {
        return producto.imagenes.length - 1;
      } else if (newIndex >= producto.imagenes.length) {
        return 0;
      } else {
        return newIndex;
      }
    });
    setZoomLevel(1);
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handleCerrarZoom = () => {
    setZoomLevel(1);
  };

  const handleAgregarAlCarrito = () => {
    const nombreConModelo = selectedModel
      ? `${producto.name} - ${selectedModel}`
      : producto.name;

    agregarAlCarrito(
      {
        id: producto.id,
        nombre: nombreConModelo,
        precio: parseFloat(producto.price),
        imagen: getCurrentImage(),
        model: selectedModel,
      },
      cantidad
    );

    closeModal();
    mostrarNotificacion(nombreConModelo);
  };

  const mostrarNotificacion = (productoNombre) => {
    Swal.fire({
      icon: "success",
      title: "Agregado al carrito",
      text: `Se ha agregado ${productoNombre} al carrito.`,
    });
  };

  const getCurrentImage = () => {
    return producto.imagenes && producto.imagenes.length > 0
      ? producto.imagenes[currentImageIndex]
      : null;
  };

  const handleZoomStart = (event) => {
    const containerRect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - containerRect.left;
    const offsetY = event.clientY - containerRect.top;
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;

    setZoomStartPosition({
      x: (centerX - offsetX) / zoomLevel,
      y: (centerY - offsetY) / zoomLevel,
    });
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 1));
  };

  const handleIncrementarCantidad = () => {
    setCantidad((prevCantidad) => prevCantidad + 1);
  };

  const handleDecrementarCantidad = () => {
    setCantidad((prevCantidad) => Math.max(prevCantidad - 1, 1));
  };

  return (
    <div className="overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {producto.imagenes && producto.imagenes.length > 1 && (
          <div className="image-navigation">
            <button
              className="toggle-buttonn left-arrow"
              onClick={() => handleToggleImage("left")}
            >
              {"<"}
            </button>
            <button
              className="toggle-buttonn right-arrow"
              onClick={() => handleToggleImage("right")}
            >
              {">"}
            </button>
          </div>
        )}
        {producto.imagenes && producto.imagenes.length > 0 && (
          <div className="image-container" onClick={(e) => handleZoomStart(e)}>
            <img
              src={getCurrentImage()}
              alt={producto.name}
              className="product-image"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: `${zoomStartPosition.x}px ${zoomStartPosition.y}px`,
              }}
            />
          </div>
        )}
        <div className="zoom-buttons">
          <button onClick={handleZoomIn}>+</button>
          <button onClick={handleZoomOut}>-</button>
          <button onClick={handleCerrarZoom} className="button button-close">
            Cerrar Zoom
          </button>
        </div>
        <div className="h33">
          <h3>{producto.name}</h3>
        </div>
        <p>{producto.description}</p>
        <p>Precio: ${producto.price}</p>

        {producto.modelos && producto.modelos.length > 0 && (
          <div className="model-dropdown-container">
            <label htmlFor={`modelDropdown-${producto.id}`}>
              Selecciona un modelo:
            </label>
            <select
              id={`modelDropdown-${producto.id}`}
              value={selectedModel}
              onChange={handleModelChange}
            >
              {producto.modelos.map((modelo, index) => (
                <option key={index} value={modelo}>
                  {modelo}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="quantity-container">
          <button onClick={handleDecrementarCantidad}>-</button>
          <span>{cantidad}</span>
          <button onClick={handleIncrementarCantidad}>+</button>
        </div>

        <div className="buttons-container">
          <button onClick={handleAgregarAlCarrito} className="button">
            Agregar al carrito
          </button>
          <button onClick={closeModal} className="button button-close">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetallesProductoContainer;
