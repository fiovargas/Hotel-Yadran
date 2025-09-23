import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ServicesHabitaciones from '../../services/ServicesHabitaciones'
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Carrusel.css";

function Carrusel() {

  const [habitaciones, setHabitaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await ServicesHabitaciones.getHabitaciones();
        setHabitaciones(data || []);

      } catch (error) {
        console.error("Error cargando habitaciones:", error);

      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

    if (loading) return <p>Cargando habitaciones...</p>;
  if (!habitaciones.length) return <p>No hay habitaciones disponibles.</p>;
  
  return (
    <div>
      
      <div className="carrusel-container">
        <Carousel fade interval={3000} pause={false}>
          {habitaciones.map(hab => (
            <Carousel.Item key={hab.id}>
              <img
                className="d-block carrusel-img"
                src={hab.imagen}
                alt={hab.nombre}
              />
              <Carousel.Caption>
                <h3>{hab.nombre}</h3>
                <p>Capacidad: {hab.capacidad}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

      <div className='btnContenedor'>
        <button className='btnHabit' onClick={() => navigate("/InfoHabit")}>Ver nuestras habitaciones</button>
      </div>
      </div>
    </div>
  )
}

export default Carrusel
