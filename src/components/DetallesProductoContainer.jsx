import React from "react";
import Modal from "react-modal";
import { useCarrito } from "./context/CarritoContext";
import Swal from 'sweetalert2';  // Importa SweetAlert2
import "./DetallesProductoContainer.css"; // Importa el archivo de estilos

const DetallesProductoContainer = ({ producto, closeModal }) => {
  const { agregarAlCarrito } = useCarrito();

  const handleAgregarAlCarrito = () => {
    agregarAlCarrito(producto, 1);
    closeModal();
    mostrarNotificacion(producto.nombre);
  };

  const mostrarNotificacion = (productoNombre) => {
    // Utiliza SweetAlert2 para mostrar la notificación
    Swal.fire({
      icon: 'success',
      title: 'Agregado al carrito',
      text: `Se ha agregado ${productoNombre} al carrito.`,
    });
  };

  return (
    <div className="overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="product-image"
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
      </div>
    </div>
  );
};

export default DetallesProductoContainer;
