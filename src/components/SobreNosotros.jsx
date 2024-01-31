import React from "react";
import "./SobreNosotros.css";

const SobreNosotros = () => {
  return (
    <div className="sobre-nosotros-background">

      <div className="sobre-nosotros-container">
        <div className="sobre-nosotros-content">
          <h2 className="titulo-bienvenida">¡Bienvenidos a TyPMaquillaje!</h2>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/fotos-de-ecommerce.appspot.com/o/Background%2FSin%20t%C3%ADtulo.png?alt=media&token=ec69e926-9bfc-4aba-b839-1998d93f4945"
            alt="Imagen del creador"
            className="imagen-creador"
          />
          <p>
            Desde el 1 de diciembre de 2023, en TyPMaquillaje nos dedicamos a
            realzar tu belleza única. Somos apasionados por ofrecerte productos
            de maquillaje de alta calidad que potencien tu estilo y confianza.
            En nuestro emprendimiento, buscamos inspirar la autenticidad y la
            expresión personal a través de la magia del maquillaje. Descubre
            nuestra amplia gama de productos cuidadosamente seleccionados para
            realzar tu belleza interior y exterior. ¡Únete a nuestra comunidad y
            deja que TyPMaquillaje sea tu compañero perfecto para resaltar lo
            mejor de ti!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SobreNosotros;
