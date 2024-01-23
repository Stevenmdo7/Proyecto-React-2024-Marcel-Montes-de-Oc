import React, { useState, useRef } from "react";
import { useCarrito } from "./context/CarritoContext";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import emailjs from "@emailjs/browser";
import axios from "axios";
import "./Checkout.css";

const Checkout = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useCarrito();
  const [nombre, setNombre] = useState("");
  const [emailUsuario, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [preferenceId, setPreferenceId] = useState(null);
  const form = useRef();

  initMercadoPago("TEST-487b4b60-7d76-46eb-b6ad-742a4a56b274", {
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

  const handleCompraWhatsApp = () => {
    if (nombre && telefono && direccion) {
      const mensajeWhatsApp = generarMensajeWhatsApp();
      abrirWhatsApp(mensajeWhatsApp);
    } else {
      setMensaje("Completa los campos antes de realizar la compra.");
    }
  };

  const generarMensajeWhatsApp = () => {
    const productosWhatsApp = carrito.map((item) => {
      return `${item.cantidad}x ${item.producto.nombre}`;
    });

    const mensaje = `¡Hola!\nMi nombre es ${nombre}\nMi dirección es ${direccion}  quisiera comprar los siguientes productos:\n${productosWhatsApp.join(
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
    if (nombre && telefono && direccion) {
      const id = await createPreference();
      if (id) {
        setPreferenceId(id);
      }
    } else {
      setMensaje("Completa los campos antes de realizar la compra.");
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
      sendEmail(); // <-- Mover la llamada a sendEmail aquí
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

  const sendEmail = async () => {
    try {
      const templateParams = {
        Nombre: nombre,
        Telefono: telefono,
        Direccion: direccion,
        Email: emailUsuario,
        Productos: obtenerNombreYCantidad(),
        Total_de_venta: calcularTotal().toFixed(2),
      };

      const response = await emailjs.send(
        "service_4u3houp",
        "template_ri4i6eg",
        templateParams,
        "KzbXIt10oyqr_H7uE"
      );
      console.log(response.text);
      setMensaje("Correo enviado exitosamente");
    } catch (error) {
      console.log(error.text);
      setMensaje("Error al enviar el correo");
    }
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
              Eliminar "1"
            </button>
          </li>
        ))}
      </ul>

      <p className="total">Total: ${calcularTotal().toFixed(2)}</p>
      <button className="clear-button" onClick={() => vaciarCarrito()}>
        Vaciar el carrito
      </button>

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

      <div className="input-group">
        <label htmlFor="direccion">Email:</label>
        <input
          type="text"
          id="emailUsuario"
          value={emailUsuario}
          onChange={(e) => setEmail(e.target.value)}
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
          title="Ingresa un formato de email válido"
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="telefono">Teléfono Móvil:</label>
        <input
          type="tel"
          id="telefono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>

      <h2>Detalles de pago</h2>

      <div className="mercado-paguito">
        <button
          className="mercadopago-button"
          onClick={(e) => {
            e.preventDefault();
            handleCompraMercadoPago();
          }}
          disabled={!nombre || !telefono || !direccion}
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/fotos-de-ecommerce.appspot.com/o/logo%20mP.png?alt=media&token=08164af0-ffeb-4541-9d1f-8f99124ea2f3"
            alt="WhatsApp Logo"
            className="mercadop-logo"
          />
          Comprar a través de Mercado Pago
        </button>
      </div>

      {preferenceId && (
        <Wallet initialization={{ preferenceId: preferenceId }} />
      )}

      <div className="whatsapp-button-container">
        <button
          className="whatsapp-button"
          onClick={handleCompraWhatsApp}
          disabled={!nombre || !telefono || !direccion}
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/fotos-de-ecommerce.appspot.com/o/whatsapp.png?alt=media&token=f628cfc3-e323-4be3-93fd-df2d9119648e"
            alt="WhatsApp Logo"
            className="whatsapp-logo"
          />
          Comprar a través de WhatsApp
        </button>
      </div>

      {mensaje && <p className="purchase-message">{mensaje}</p>}
    </div>
  );
};

export default Checkout;
