import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import "./DetallesReserva.css";

// Precios diarios específicos para ciertas fechas
const DAILY_PRICES = {
  "2025-10-01": 79, "2025-10-02": 79, "2025-10-03": 79, "2025-10-04": 109, "2025-10-05": 79,
  "2025-10-06": 79, "2025-10-07": 79, "2025-10-08": 79, "2025-10-09": 79, "2025-10-10": 79,
  "2025-10-11": 109, "2025-10-12": 79, "2025-10-13": 79, "2025-10-14": 79, "2025-10-15": 79,
  "2025-10-16": 79, "2025-10-17": 79, "2025-10-18": 109, "2025-10-19": 79, "2025-10-20": 79,
  "2025-10-21": 79, "2025-10-22": 79, "2025-10-23": 79, "2025-10-24": 79, "2025-10-25": 109,
  "2025-10-26": 79, "2025-10-27": 79, "2025-10-28": 79, "2025-10-29": 79, "2025-10-30": 79, "2025-10-31": 79,
};

function DetallesReserva() {

  // Obtener los datos enviados desde la página anterior
  const location = useLocation();
  const navigate = useNavigate();
  const reserva = location.state; // contiene info de la reserva (habitacion, fechas, huéspedes, promo, etc.)

  const [nights, setNights] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  // useEffect que se ejecuta cuando llega la reserva
  useEffect(() => {
    if (!reserva) return;  // Si no hay reserva, salir (evita errores)

    const nightsArr = [];  // Array temporal para guardar noches con precio
    let sub = 0; // Acumulador de subtotal
    const start = new Date(reserva.checkIn);
    const end = new Date(reserva.checkOut);

    // Iterar por cada día entre checkIn y checkOut
    for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const dateKey = `${yyyy}-${mm}-${dd}`;

      // Precio del día: si existe en DAILY_PRICES, usarlo; si no, usar precio de la habitación; si no existe, 0
      const precioDia = DAILY_PRICES[dateKey] ?? reserva.habitacion.precio ?? 0;
      sub += precioDia;
      nightsArr.push({ date: dateKey, precio: precioDia });
    }

    // Aplicar descuento si hay promo code
    if (reserva.promoCode === "DESC10") sub *= 0.9;

    // Guardar resultados en los estados
    setNights(nightsArr);
    setSubtotal(sub);

  }, [reserva]); // Se ejecuta cada vez que cambia "reserva"

  // Si no hay reserva, mostrar mensaje y botón para volver
  if (!reserva) {
    return (
      <div className="resumen-container">
        <h2>No hay información de la reserva</h2>
        <button onClick={() => navigate("/ReservasHabit")}>Volver a reservar</button>
      </div>
    );
  }

  // Calcular impuestos, total y depósito
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
              <td>${n.precio.toFixed(2)}</td>
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
        <button onClick={() => navigate("/InfoHuesp", { state: { ...reserva, nights, subtotal, impuestos, total, deposito } })}>Siguiente</button>
      </div>
    </div>
  );
}

export default DetallesReserva;
