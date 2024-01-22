import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-item">
        <h3>Teléfono de Contacto</h3>
        {/* Agrega tu número de teléfono aquí */}
        <p>Teléfono: +598-98-879-444</p>
      </div>
      <div className="contact-item">
        <h3>Email</h3>
        {/* Agrega tu dirección de correo electrónico aquí */}
        <p>Email: pepitoalcachofa@tumamaentanga.beluga</p>
      </div>
      
        <a
          href="https://www.instagram.com/typmaquillaje/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/fotos-de-ecommerce.appspot.com/o/pngwing.com%20(2).png?alt=media&token=55e78307-ba5a-40c1-8694-b44aaa07fcc0"
            alt="Instagram"
            className="social-logo"
          />
          <span>@typmaquillaje</span>
        </a>
      
        <a
          href="https://www.tiktok.com/@typmaquillaje"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/fotos-de-ecommerce.appspot.com/o/pngwing.com%20(1).png?alt=media&token=069647f1-3443-4faf-9b86-175489ebf345" 
            alt="TikTok"
            className="social-logo"
          />
          <span>@typmaquillaje</span>
        </a>
    </div>
  );
};

export default Contact;
