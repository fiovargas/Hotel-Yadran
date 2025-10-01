import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ServicesHabitaciones from '../../services/ServicesHabitaciones'
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./InfoHabitaciones.css";

function InfoHabitaciones() {

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
        {habitaciones.map(hab => (
          <div key={hab.id} className="habitacion-carrusel">

            {/* Carrusel de imágenes de UNA habitación */}
            <Carousel fade interval={3000} pause="hover">
              {hab.otrasImg.map((img, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block carrusel-img"
                    src={img}
                    alt={`${hab.nombre} - foto ${index + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
              <div className="habitacion-info">
                <h2>{hab.nombre}</h2>
                <p>{hab.descripcion}</p>
                <p className="servicios"><strong>Servicios:</strong> {hab.servicios}</p>

                <div className='btnContenedor'>
                  <button className='btn' onClick={() => navigate("/ReservasHabit", { state: { habitacion: hab } })}> Añadir habitación </button>
                </div>
            </div>
          </div>
        ))}
      </div>
   </div>
  )
}

export default InfoHabitaciones
