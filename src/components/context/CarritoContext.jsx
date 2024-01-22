// CarritoContext.jsx
import React, { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto, cantidad) => {
    const productoExistente = carrito.find((item) => item.producto.id === producto.id);

    if (productoExistente) {
      // Si el producto ya existe en el carrito, actualiza la cantidad
      const nuevoCarrito = carrito.map((item) =>
        item.producto.id === producto.id
          ? { producto: item.producto, cantidad: item.cantidad + cantidad }
          : item
      );
      setCarrito(nuevoCarrito);
    } else {
      // Si el producto no existe en el carrito, agrégalo
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
