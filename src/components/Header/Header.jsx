import React, { useState, useRef, useEffect  } from "react";
import { useNavigate } from 'react-router-dom'
import headerImg from '../../assets/Logohotel.jpg'
import "./Header.css";


function Header() {

    const [menuOpen, setMenuOpen] = useState(false);
    const containerRef = useRef(null);
    const navigate = useNavigate();

   // Cierra el menú al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Oculta el menú al agrandar la pantalla
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

    const handleNavigate = (path) => {
        navigate(path);
        setMenuOpen(false);
  };




  return (
    <div>
        <header className="header">
        
            <div className="container-header">
                <img className="Logo" src={headerImg} alt="Hotel Yadran" onClick={() => handleNavigate("/")}/>

                {/* Navegación escritorio */}
                <nav className="nav">
                    <span onClick={() => handleNavigate("/")}>Inicio</span>
                    <span onClick={() => handleNavigate("/InfoHabit")}>Habitaciones</span>
                    <span onClick={() => handleNavigate("/InfoDelHotel")}>Contacto y Ubicación</span>
                </nav>

                {/* Botón menú móvil */}
                <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
            </div>

            <div
                className={`overlay ${menuOpen ? "show" : ""}`} onClick={() => setMenuOpen(false)}>
            </div>

            {/* Menú móvil */}
            <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
                <span onClick={() => { handleNavigate("/"); setMenuOpen(false); }}>Inicio</span>
                <span onClick={() => { handleNavigate("/InfoHabit"); setMenuOpen(false); }}>Habitaciones</span>
                <span onClick={() => { handleNavigate("/InfoDelHotel"); setMenuOpen(false); }}>Contacto y Ubicación</span>

            </div>

        </header>

    </div>
  )
}
export default Header
