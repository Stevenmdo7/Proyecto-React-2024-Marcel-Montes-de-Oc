// CartWidget.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "./context/CarritoContext";

function CartWidget() {
  const { carrito } = useCarrito();
  const logoUrl = "https://cdn-icons-png.flaticon.com/512/8146/8146003.png";

  // Calcular la cantidad total de productos en el carrito
  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <div className="cart-widget">
      <Link to="/checkout" className="cart-link">
        <img src={logoUrl} alt="Logo del carrito" className="cart-logo" />
        {/* Mostrar la cantidad total en el carrito */}
        <span className="badge bg-danger">{cantidadTotal}</span>
      </Link>
    </div>
  );
}

export default CartWidget;
