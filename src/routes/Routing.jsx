import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import InfoHabit from '../pages/InfoHabit';
import InfoHuesp from '../pages/InfoHuesp';
import ReservasHabit from '../pages/ReservasHabit';
import InfoReserva from '../pages/InfoReserva';
import Pago from '../pages/Pago';
import InfoDelHotel from '../components/InfoHotel/InfoDelHotel';
import AdminR from '../pages/AdminR';
import LoginAdmin from '../pages/LoginAdmin';

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
            <Route path="/InfoDelHotel" element={<InfoDelHotel/>}/>
            <Route path="/AdminReservas" element={<AdminR/>}/>
            <Route path="/Login" element={<LoginAdmin/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default Routing
