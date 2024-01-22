import React, { useState } from "react";
import { useCarrito } from "./context/CarritoContext";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from "axios";
import "./Checkout.css";

const Checkout = () => {
  const { carrito, obtenerCarrito, eliminarDelCarrito, vaciarCarrito } =
    useCarrito();
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago('TEST-487b4b60-7d76-46eb-b6ad-742a4a56b274', {
    locale: "es-UY",
  });
  const obtenerProductosUnicos = () => {
    const productosUnicos = [];
    carrito.forEach((item) => {
      if (!productosUnicos.find((p) => p.id === item.producto.id)) {
        productosUnicos.push(item.producto);
      }
    });
    return productosUnicos;
  };
  const handleCompra = () => {
    const carritoActual = obtenerCarrito();

    if (carritoActual.length > 0 && nombre && direccion && tarjeta) {
      setMensaje("¡Compra realizada con éxito!");
    } else {
      setMensaje(
        "Por favor, completa todos los campos y asegúrate de tener productos en el carrito."
      );
    }
  };

  const handleCompraWhatsApp = () => {
    const mensajeWhatsApp = generarMensajeWhatsApp();
    abrirWhatsApp(mensajeWhatsApp);
  };

  const generarMensajeWhatsApp = () => {
    const productosWhatsApp = carrito.map((item) => {
      return `${item.cantidad}x ${item.producto.nombre}`;
    });

    const mensaje = `¡Hola! Quiero comprar los siguientes productos:\n${productosWhatsApp.join(
      "\n"
    )}\nTotal: $${calcularTotal().toFixed(2)}`;
    return encodeURIComponent(mensaje);
  };

  const abrirWhatsApp = (mensaje) => {
    const numeroTelefono = "+59898879444";
    const enlaceWhatsApp = `https://wa.me/${numeroTelefono}?text=${mensaje}`;
    window.open(enlaceWhatsApp, "_blank");
  };

  const calcularTotal = () => {
    return carrito.reduce(
      (total, item) => total + item.producto.precio * item.cantidad,
      0
    );
  };

  const handleCompraMercadoPago = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  const createPreference = async () => {
    try {
      const nombreYCantidad = obtenerNombreYCantidad();
      const precio = calcularTotal();
  
      const response = await axios.post(
        "https://backend-typmaquillahje-m1zkpweon-steven-montes-de-ocas-projects.vercel.app/create_preference",
        {
          description: nombreYCantidad,
          price: precio,
          quantity: 1,
          currency_id: "UYU",
        }
      );
  
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };
  
  const obtenerNombreYCantidad = () => {
    return carrito
      .map((item) => `${item.producto.nombre} x${item.cantidad}`)
      .join(", ");
  };

  return (
    <div className="checkout-container">
      <h2>Resumen de compra</h2>
      <ul className="product-list">
        {obtenerProductosUnicos().map((producto) => (
          <li key={producto.id} className="product-info">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="product-image"
            />
            <div className="product-details">
              <span className="product-name">{producto.nombre}</span>
              <span>
                Cantidad:{" "}
                {carrito.reduce(
                  (total, item) =>
                    item.producto.id === producto.id
                      ? total + item.cantidad
                      : total,
                  0
                )}
              </span>
              <span>Precio: ${producto.precio.toFixed(2)}</span>
            </div>
            <button
              className="remove-button"
              onClick={() => eliminarDelCarrito(producto.id, 1)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <p className="total">Total: ${calcularTotal().toFixed(2)}</p>

      <h2>Detalles del envío</h2>
      <div className="input-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="direccion">Dirección:</label>
        <input
          type="text"
          id="direccion"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
      </div>

      <h2>Detalles de pago</h2>
      <div className="input-group">
        <label htmlFor="tarjeta">Número de tarjeta:</label>
        <input
          type="text"
          id="tarjeta"
          value={tarjeta}
          onChange={(e) => setTarjeta(e.target.value)}
        />
      </div>

      <button className="buy-button" onClick={handleCompra}>
        Comprar
      </button>
      <button
        className="whatsapp-button"
        onClick={handleCompraWhatsApp}
      >
        <img
          src="images/whatsapp.png"
          alt="WhatsApp Logo"
          className="whatsapp-logo"
        />
        Comprar a través de WhatsApp
      </button>
      <button
        className="mercadopago-button"
        onClick={handleCompraMercadoPago}
      >
        Comprar a través de Mercado Pago
      </button>

      {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}

      {mensaje && <p className="purchase-message">{mensaje}</p>}
    </div>
  );
};

export default Checkout;
