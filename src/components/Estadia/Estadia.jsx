import React from 'react'
import "./Estadia.css";
import SectionDivider from "../Divisiones/SectionDivider";

function Estadia() {

  return (
    <div>
      <div>
        <h2 className='tituloEstadia'>ESTADÍA</h2>
        
        <p className='p2'>
          ¡Su segundo hogar! Póngase cómodo en una de nuestras encantadoras habitaciones a pocos pasos de la playa. <br />
          <br />
          Habitaciones equipadas con una amplia variedad de facilidades, que le harán sentirse como en casa. 
          La mayoría de nuestras habitaciones se caracterizan por tener magníficas vistas al océano, a los jardines tropicales, o a alguna de nuestras áreas de piscina. 
          Amplios balcones y terrazas le invitan a disfrutar del paraíso tropical desde la privacidad de su propia habitación.</p>
      </div>
      <SectionDivider titulo="Habitaciones" />
    </div>
  )
}

export default Estadia
