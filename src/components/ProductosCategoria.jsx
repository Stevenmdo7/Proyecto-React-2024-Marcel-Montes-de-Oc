import React, { useState, useEffect } from 'react';
import { getProductsByCategory } from "./firebase.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DetallesProductoContainer from "./DetallesProductoContainer";
import "./ProductosCategoria.css"; 

const ProductosCategoria = ({ categoria }) => {
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosCategoria = await getProductsByCategory(categoria);
        setProductosFiltrados(productosCategoria);

        if (productosCategoria.length === 0) {
          setMostrarMensaje(true);
        } else {
          setMostrarMensaje(false);
        }
      } catch (error) {
        console.error("Error al obtener productos por categoría:", error);
        toast.error("Error al cargar productos. Por favor, inténtalo de nuevo.");
      }
    };

    fetchData();
  }, [categoria]);

  const verDetalles = (producto) => {
    setProductoSeleccionado(producto);
  };

  return (
    <div id="productos-categoria-container">
      {mostrarMensaje ? (
        <div className="mensaje-animado mostrar">
          <p>No hay productos para mostrar.</p>
        </div>
      ) : (
        <ul className="productos-lista">
          {productosFiltrados.map((producto) => (
            <li key={producto.id} className="producto-item">
              <h3 className="producto-titulo">{producto.nombre}</h3>
              <img
                className="producto-imagen"
                src={producto.imagen}
                alt={producto.nombre}
              />
              <button onClick={() => verDetalles(producto)} className="producto-boton">
                Ver Detalle
              </button>
            </li>
          ))}
        </ul>
      )}

      {productoSeleccionado && (
        <DetallesProductoContainer
          producto={productoSeleccionado}
          closeModal={() => setProductoSeleccionado(null)}
        />
      )}
    </div>
  );
};

export default ProductosCategoria;
