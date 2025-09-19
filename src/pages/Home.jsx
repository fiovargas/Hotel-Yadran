import React from 'react'
import Inicio from '../components/Inicio/Inicio'
import Estadia from '../components/Estadia/Estadia'
import Carrusel from '../components/Carrusel-Habitaciones/Carrusel'
import Galeria from '../components/Galeria/Galeria'
import Register from '../components/Registro/Register'
import InfoDelHotel from '../components/Mapa/InfoDelHotel'

function Home() {
  return (
    <div>
      <Inicio/>
      <Estadia/>
      <Carrusel/>
      <Galeria/>
      <Register/>
      <InfoDelHotel/>
    </div>
  )
}

export default Home
