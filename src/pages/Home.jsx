import React from 'react'
import Header from '../components/Header/Header'
import Inicio from '../components/Inicio/Inicio'
import Estadia from '../components/Estadia/Estadia'
import Carrusel from '../components/Carrusel-Habitaciones/Carrusel'
import Register from '../components/Registro/Register'
import InfoDelHotel from '../components/Mapa/InfoDelHotel'

function Home() {
  return (
    <div>
      <Header/>
      <Inicio/>
      <Estadia/>
      <Carrusel/>
      <Register/>
      <InfoDelHotel/>
    </div>
  )
}

export default Home
