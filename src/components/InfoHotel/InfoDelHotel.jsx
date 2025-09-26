import React, { useState } from "react";
import LogoWhats from "../../assets/LogoWhatsapp.png";
import LogoContactanos from "../../assets/LogoContactanos.png";
import "./InfoDelHotel.css";

function InfoDelHotel() {

  const [isOpen, setIsOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleAccepted = () => setAccepted(!accepted);

  return (
    <div className="foto">
      <div className="contacto-container">
        <div className="contT">
        <h2 className="contacto-title">¡Contáctanos!</h2>
          <p className="tituloContac">Hotel Yadran, Puntarenas, Costa Rica</p>
        </div>

        <div className="contacto-buttons">
          <a 
            href="https://wa.me/50683607791" target="_blank"  rel="noopener noreferrer" className="btnWhatsapp">
            <img src={LogoWhats} alt="WhatsApp" className="whatsapp-img"/>
          </a>
          
          <button className="btnContactanos" onClick={openModal}>
            <img className="contacto-img" src={LogoContactanos} alt="Contactanos"/>
          </button>
        </div>

        {isOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              
              <button className="modal-close-btn" onClick={closeModal}>
                &times;
              </button>

              <h2 className="modal-title">Comunícate con nosotros</h2>

              <div className="contact-form">
                <label>
                  <input type="text" placeholder="Nombre" required />
                </label>
                <label>
                  <input type="email" placeholder="Correo electrónico*" required />

                </label>
                <label>
                  <textarea placeholder="Mensaje"></textarea>
                </label>
                <label>
                  <input type="tel" placeholder="Teléfono*" required />
                </label>

                <div className="checkbox-container">
                  <input type="checkbox" id="newsletter" checked={accepted} onChange={toggleAccepted}/>
                  <label htmlFor="newsletter">Inscribete para nuestra lista de correo electrónico para recibir actualizaciones, promociones y más.</label>
                </div>

                <button type="submit" className="submit-btn" disabled={!accepted}>Enviar</button>
              </div>
            </div>
          </div>

        )}

      </div>
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125743.94526660122!2d-84.9935817718506!3d9.975634457073191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa02ec9b5d73d77%3A0x6e0935c9aa625d73!2sYadran%20Beach%20Resort!5e0!3m2!1ses!2scr!4v1758741754534!5m2!1ses!2scr" title="Mapa Hotel Yadran"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
    </div>
  )
}

export default InfoDelHotel
