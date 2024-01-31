import React from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "./context/CarritoContext";
import "./CartWidget.css";

function CartWidget() {
  const { carrito } = useCarrito();
  const logoUrl = "https://cdn-icons-png.flaticon.com/512/8146/8146003.png";

  const cantidadTotal = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  return (
    <div className="cart-widget">
      <Link to="/checkout" className="cart-link">
        <span className="badge bg-danger">{cantidadTotal}</span>
        <img src={logoUrl} alt="Logo del carrito" className="cart-logo" />
        Ir al carrito
      </Link>
    </div>
  );
}

export default CartWidget;
