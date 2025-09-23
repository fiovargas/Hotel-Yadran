import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import InfoHabit from '../pages/InfoHabit';
import InfoHuesp from '../pages/InfoHuesp';
import ReservasHabit from '../pages/ReservasHabit';
import InfoReserva from '../pages/InfoReserva';
import Pago from '../pages/Pago';
import Contact from '../pages/Contact';
import UbicacionH from '../pages/UbicacionH';

function Routing() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/InfoHuesp" element={<InfoHuesp/>}/>
            <Route path="/InfoHabit" element={<InfoHabit/>}/>
            <Route path="/ReservasHabit" element={<ReservasHabit/>}/>
            <Route path="/InfoReserva" element={<InfoReserva/>}/>
            <Route path="/Pago" element={<Pago/>}/>
            <Route path="/Contact" element={<Contact/>}/>
            <Route path="/UbicacionH" element={<UbicacionH/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default Routing
