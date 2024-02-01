import React from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "./context/CarritoContext";
import "./CartWidget.css";

function CartWidget() {
  const { carrito } = useCarrito();
  const logoUrl = "https://firebasestorage.googleapis.com/v0/b/fotos-de-ecommerce.appspot.com/o/pngegg.png?alt=media&token=870477e6-03b3-42e2-90de-fda1b5587e82";

  const cantidadTotal = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  return (
    <div className="cart-widget">
      <Link to="/checkout" className="cart-link">
        <span className="badge bg-danger">{cantidadTotal}</span>
        <img src={logoUrl} alt="Logo del carrito" className="cart-logo" />
      </Link>
    </div>
  );
}

export default CartWidget;
