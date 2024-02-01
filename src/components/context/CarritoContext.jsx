import React, { createContext, useContext, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "@sweetalert2/theme-dark/dark.css";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto, cantidad) => {
    const productoExistente = carrito.find(
      (item) => item.producto.id === producto.id
    );

    if (productoExistente) {
      const nuevoCarrito = carrito.map((item) =>
        item.producto.id === producto.id
          ? { producto: item.producto, cantidad: item.cantidad + cantidad }
          : item
      );
      setCarrito(nuevoCarrito);
    } else {
      setCarrito([...carrito, { producto, cantidad }]);
    }
  };

  const eliminarDelCarrito = (productoId, cantidad) => {
    const nuevoCarrito = carrito.map((item) => {
      if (item.producto.id === productoId) {
        const nuevaCantidad = item.cantidad - cantidad;
        return {
          producto: item.producto,
          cantidad: nuevaCantidad > 0 ? nuevaCantidad : 0,
        };
      }
      return item;
    });
    setCarrito(nuevoCarrito.filter((item) => item.cantidad > 0));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Se ha vaciado el carrito",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const obtenerCarrito = () => carrito;

  const value = {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    vaciarCarrito,
    obtenerCarrito,
  };

  return (
    <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  return useContext(CarritoContext);
};
