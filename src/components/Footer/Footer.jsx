import React from 'react'
import LogoFace from "../../assets/LogoFacebook.png"
import LogoInsta from "../../assets/LogoInstagram.png"
import "./Footer.css";


function Footer() {
  return (
    <div>
      <div>
        <footer className="footer">
          <div className="footer-main">
            <div className="footer-container">
                <h3 className="footer-title">Hotel Yadran</h3>
                <p>Al Final del Paseo de los Turistas, Puntarenas, Costa Rica</p>
                <p>Teléfono: <a href="tel:+50626612662">+(506) 2661-2662</a></p>
                <p>Whatsapp: <a href="https://wa.me/50683607791" target="_blank" rel="noopener noreferrer">+(506) 8360-7791</a></p>
                <p>Email: <a href="mailto:reservas@hotelyadrancr.com">reservas@hotelyadrancr.com</a></p>
            </div>

            <div className="LogosRedes">
              <a href="https://www.facebook.com/share/17Cj3hKFvj/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
              <img src={LogoFace} alt="Logo Facebook"/>
              </a>
              <a href="https://www.instagram.com/hotelyadran?igsh=aGc0aWo5ejQwaTk1" target="_blank" rel="noopener noreferrer">
              <img src={LogoInsta} alt="Logo Instagram"/>
              </a>
            </div>
          </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Hotel Yadran. Todos los derechos reservados.</p>
            </div>
        </footer>
      </div>
    </div>
  )
}

export default Footer
