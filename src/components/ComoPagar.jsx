import React from "react";
import "./ComoPagar.scss";

const ComoPagar = () => {
  return (
    <div className="como-pagar-container">
      <div className="como-pagar-content">
        <h2>¿Cómo Comprar?</h2>
        <p>
          ¡Gracias por elegirnos! Aquí te presentamos una guía paso a paso para realizar tu compra de manera fácil y segura:
        </p>
        <ol>
          <li>
            Agrega tus productos al carrito desde el carrusel "Los más comprados", el catálogo o la sección de categorías.
          </li>
          <li>
            Si exploras categorías, haz clic en "Ver detalle" antes de agregar al carrito para obtener información adicional.
          </li>
          <li>
            Ve al carrito y revisa tus productos seleccionados, cantidades y precios antes de proceder.
          </li>
          <li>
            Completa los campos de Nombre, Dirección, Email y Teléfono Móvil para finalizar la compra.
          </li>
          <li>
            Utiliza los botones "+" y "-" para ajustar la cantidad y luego presiona "Agregar al carrito".
          </li>
          <li>
            Una vez listo, haz clic en el logo del carrito en la barra de opciones.
          </li>
          <li>
            Selecciona "Comprar a través de Whatsapp" para coordinar el pago en efectivo o por transferencia con nuestro representante.
          </li>
          <li>
            O elige "Comprar a través de Mercado Pago" para realizar pagos seguros en línea. Serás redirigido a una página de agradecimiento donde podrás coordinar el envío.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default ComoPagar;
