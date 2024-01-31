import React from "react";
import "./ComoPagar.scss";

const ComoPagar = () => {
  return (
    <div className="como-pagar-container">
      <div className="como-pagar-content">
        <h2>¿Cómo Comprar?</h2>
        <p>
          Realizar una compra en nuestra página es fácil y seguro. Sigue estos
          simples pasos:
        </p>
        <ol>
          <li>
            Presiona "Agregar al carrito" para seleccionar tus productos desde
            la página de inicio o la sección de categorías.
          </li>
          <li>
            Al explorar categorías, haz clic en "Ver detalles" antes de agregar
            al carrito para obtener información adicional.
          </li>
          <li>
            Ve al carrito y revisa tus productos seleccionados, cantidades y
            precios antes de proceder.
          </li>
          <li>
            Completa los campos de Nombre, Dirección, Email y Teléfono Móvil
            para finalizar la compra.
          </li>
          <li>
            Paga en efectivo o mediante transferencia prex utilizando el botón
            "Comprar a través de Whatsapp". Coordina el pago y envío con nuestro
            representante.
          </li>
          <li>
            Usa el botón "Comprar a través de Mercado Pago" para realizar pagos
            seguros en línea. Serás redirigido a una página de agradecimiento, y
            puedes contactarnos por chat para coordinar el envío.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default ComoPagar;
