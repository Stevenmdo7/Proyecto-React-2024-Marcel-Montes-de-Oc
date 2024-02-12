import React, { useState, useEffect } from "react";
import { useCarrito } from "./context/CarritoContext";
import Swal from "sweetalert2";
import "./Product.scss";
import DetallesProductoContainer from "./DetallesProductoContainer";

const Product = React.memo(({ id, name, price, description, imagenes, modelos }) => {
  const { agregarAlCarrito: agregarAlCarritoContext } = useCarrito();
  const [cantidad, setCantidad] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(modelos ? modelos[0] : null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cachedImages, setCachedImages] = useState([]);

  useEffect(() => {
    // Check for cached images in localStorage
    const cachedImagesString = localStorage.getItem("cachedImages");
    if (cachedImagesString) {
      setCachedImages(JSON.parse(cachedImagesString));
    }
  }, []);

  useEffect(() => {
    // Update cached images when new images are loaded
    localStorage.setItem("cachedImages", JSON.stringify(cachedImages));
  }, [cachedImages]);

  const handleAgregarAlCarrito = () => {
    const nombreConModelo = selectedModel ? `${name} - ${selectedModel}` : name;

    agregarAlCarritoContext({
      id,
      nombre: nombreConModelo,
      precio: parseFloat(price),
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

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handleToggleImage = (direction) => {
    const newIndex =
      direction === "right" ? currentImageIndex + 1 : currentImageIndex - 1;
    setCurrentImageIndex((prevIndex) => {
      if (newIndex < 0) {
        return imagenes.length - 1;
      } else if (newIndex >= imagenes.length) {
        return 0;
      } else {
        return newIndex;
      }
    });
  };

  const getCurrentImage = () => {
    if (cachedImages.includes(imagenes[currentImageIndex])) {
      // If image URL is cached, return it directly
      return imagenes[currentImageIndex];
    } else {
      // If image URL is not cached, preload it and add to cachedImages
      const img = new Image();
      img.src = imagenes[currentImageIndex];
      img.onload = () => {
        setCachedImages([...cachedImages, img.src]);
      };
      return null; // Return null until image is loaded
    }
  };

  return (
    <div className="product-conntainer">
      <div
        className={`product ${isHovered ? "hovered" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {imagenes && imagenes.length > 1 && (
          <div className="imagee-navigation">
            <button
              className="toggle-buttton leeft-arrow"
              onClick={() => handleToggleImage("left")}
            >
              {"<"}
            </button>
            <button
              className="toggle-buttton righht-arrow"
              onClick={() => handleToggleImage("right")}
            >
              {">"}
            </button>
          </div>
        )}
        <img
          src={getCurrentImage()}
          alt={name}
          onClick={openModal}
          className="product-image"
        />

        <h3>{name}</h3>
        <p>Precio: ${price}</p>

        {modelos && modelos.length > 0 && (
          <div className="model-dropdown-container">
            <label htmlFor={`modelDropdown-${id}`}>Elige un modelo:</label>
            <select
              id={`modelDropdown-${id}`}
              value={selectedModel}
              onChange={handleModelChange}
            >
              {modelos.map((modelo, index) => (
                <option key={index} value={modelo}>
                  {modelo}
                </option>
              ))}
            </select>
          </div>
        )}

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
            producto={{ id, name, description, price, imagenes, modelos }}
            closeModal={closeModal}
          />
        )}
      </div>
    </div>
  );
});

export default Product;
