import React, { useState } from 'react';
import VisaLogo from '../../assets/VisaLogo.jpg'
import mastercardLogo from '../../assets/mastercardLogo.png'
import americanExpressLogo from '../../assets/americanExpressLogo.png'
import './InfoDePago.css';

function InfoDePago() {

  const [titular, setTitular] = useState('');
  const [numTarjeta, setNumTarjeta] = useState('');
  const [mes, setMes] = useState('');
  const [anio, setAnio] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const handleReservar = () => {
    if (!titular || !numTarjeta || !mes || !anio || !aceptaTerminos) {
      alert('Por favor completa todos los campos y acepta los términos.');
      return;
    }
    alert('¡Reserva realizada con éxito!');
    // Aquí podrías enviar los datos al backend
  };


  return (
    <div>
      <div className="container">
        <div className='texto'>
          <h1 className='TituloPago'>Información de pago detallada</h1>
          <p>Pagar con tarjeta de crédito/débito</p>
          <p>Deberá presentarse una forma válida de pago en el check-in</p>

          <div className="tarjetas">
            <img src={VisaLogo} alt="Visa" />
            <img src={mastercardLogo} alt="Mastercard" />
            <img src={americanExpressLogo} alt="American Express" />
          </div>
        </div>
        <div className="formulario">
          <label htmlFor="Titular">Titular</label>
          <input type="text" id="Titular" placeholder="Nombre completo de su tarjeta" value={titular} onChange={(e) => setTitular(e.target.value)}/>

          <label htmlFor="NumTarjeta">Número de tarjeta</label>
          <input type="text" id="NumTarjeta" placeholder="Introducir tarjeta de crédito/débito" value={numTarjeta} onChange={(e) => setNumTarjeta(e.target.value)} />

          <div className="vencimiento">
            <p className='Venci'>Fecha de vencimiento:</p>
            <select value={mes} onChange={(e) => setMes(e.target.value)}>
              <option value="">MM</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select value={anio} onChange={(e) => setAnio(e.target.value)}>
              <option value="">AA</option>
              {[...Array(10)].map((_, i) => {
                const year = new Date().getFullYear() % 100 + i;
                return <option key={i} value={year}>{year}</option>;
              })}
            </select>
          </div>

          <div className='checkboxes2'>
            <label>
              <input type="checkbox" /> Usar misma dirección como información de contacto.
            </label>
            <label>
              <input type="checkbox" /> Notificarme sobre ofertas especiales.
            </label>
            <label>
              <input type="checkbox" checked={aceptaTerminos} onChange={(e) => setAceptaTerminos(e.target.checked)} />
              He leído y acepto los términos, condiciones y Política de privacidad.
            </label>
          </div>

          <button className="boton-reservar" onClick={handleReservar}> Reservar Ahora </button>
        </div>
      </div>
    </div>
  )
}

export default InfoDePago
