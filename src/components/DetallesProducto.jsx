import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useCarrito } from "./context/CarritoContext";
import Swal from 'sweetalert2';  
import "react-notifications-component/dist/theme.css";
import "./DetallesProducto.css";

const DetallesProducto = ({ producto, isOpen, closeModal }) => {
  const { agregarAlCarrito } = useCarrito();
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    console.log("DetallesProducto se ha montado");
    console.log("Datos del producto:", producto);
  }, []);

  const handleAgregarAlCarrito = () => {
    agregarAlCarrito(producto, 1);
    closeModal();
    mostrarNotificacion(producto.nombre);
  };

  const mostrarNotificacion = (productoNombre) => {

    Swal.fire({
      icon: 'success',
      title: 'Agregado al carrito',
      text: `Se ha agregado ${productoNombre} al carrito.`,
    });
  };

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Detalles del Producto"
      className={`modal-content ${isZoomed ? "zoomed" : ""}`}
      overlayClassName="modal-overlay"
    >
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="product-image"
        onClick={handleImageClick}
      />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p>Precio: ${producto.precio}</p>
      <div className="buttons-container">
        <button onClick={handleAgregarAlCarrito} className="button">
          Agregar al carrito
        </button>
        <button onClick={closeModal} className="button button-close">
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default DetallesProducto;
