import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import "./DetallesReserva.css";

const DAILY_PRICES = {
  "2025-10-01": 79, "2025-10-02": 79, "2025-10-03": 79, "2025-10-04": 109, "2025-10-05": 79,
  "2025-10-06": 79, "2025-10-07": 79, "2025-10-08": 79, "2025-10-09": 79, "2025-10-10": 79,
  "2025-10-11": 109, "2025-10-12": 79, "2025-10-13": 79, "2025-10-14": 79, "2025-10-15": 79,
  "2025-10-16": 79, "2025-10-17": 79, "2025-10-18": 109, "2025-10-19": 79, "2025-10-20": 79,
  "2025-10-21": 79, "2025-10-22": 79, "2025-10-23": 79, "2025-10-24": 79, "2025-10-25": 109,
  "2025-10-26": 79, "2025-10-27": 79, "2025-10-28": 79, "2025-10-29": 79, "2025-10-30": 79, "2025-10-31": 79,
};

function DetallesReserva() {

  const location = useLocation();
  const navigate = useNavigate();
  const reserva = location.state;

   if (!reserva) {
    return (
      <div className="resumen-container">
        <h2>No hay información de la reserva</h2>
        <button onClick={() => navigate("/")}>Volver al inicio</button>
      </div>
    );
  };

   const { checkIn, checkOut, habitacion, promoCode, guests } = reserva;

  // Calcular noches y subtotal según precios diarios
  const nights = [];
  let subtotal = 0;
  const start = new Date(checkIn);
  const end = new Date(checkOut);

  for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const dateKey = `${yyyy}-${mm}-${dd}`;

    // precio diario del calendario, si no existe, precio base de la habitación
    const precioDia = DAILY_PRICES[dateKey] ?? habitacion.precio ?? 0;
    subtotal += precioDia;
    nights.push({ date: dateKey, precio: precioDia });
  }

  // Aplicar código de descuento si existe
  if (promoCode === "DESC10") subtotal *= 0.9;

  const impuestos = subtotal * 0.13;
  const total = subtotal + impuestos;
  const deposito = total * 0.3;

  return (
    <div className="resumen-container">
      <h2>Factura de Reserva</h2>

      {/* Datos básicos */}
      <div className="factura-info">
        <p><strong>Habitación:</strong> {reserva.habitacion.nombre}</p>
        <p><strong>Check-in:</strong> {reserva.checkIn}</p>
        <p><strong>Check-out:</strong> {reserva.checkOut}</p>
        <p><strong>Huéspedes:</strong> {reserva.guests}</p>
        {reserva.promoCode && <p><strong>Código aplicado:</strong> {reserva.promoCode}</p>}
      </div>

      {/* Tabla de noches con precios diarios */}
      <table className="factura-tabla">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Precio por noche</th>
          </tr>
        </thead>
        <tbody>
          {nights.map((n, idx) => (
            <tr key={idx}>
              <td>{n.date}</td>
              <td>${(n.precio ?? 0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totales */}
      <div className="factura-totales">
        <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
        <p><strong>Impuestos (13%):</strong> ${impuestos.toFixed(2)}</p>
        <p className="total"><strong>Total:</strong> ${total.toFixed(2)}</p>
        <p className="deposito"><strong>Depósito (30%):</strong> ${deposito.toFixed(2)}</p>
      </div>

      {/* Acciones */}
      <div className="resumen-actions">
        <button onClick={() => navigate(-1)}>← Editar</button>
        <button onClick={() => navigate("/pago")}>Confirmar y pagar</button>
      </div>
    </div>
  );
}

export default DetallesReserva;
