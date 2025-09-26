import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ServicesHabitaciones from "../../services/ServicesHabitaciones";
import "./Reservas.css"

function Reservas() {
  return <BookingCalendar />;
}

// --- Formatea fecha a string YYYY-MM-DD ---
const formatDate = (year, month, day) =>
  `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

const MOCK_PRICES = {
  "2025-10-01": 79,
  "2025-10-02": 79,
  "2025-10-03": 79,
  "2025-10-04": 109,
  "2025-10-05": 79,
  "2025-10-06": 79,
  "2025-10-07": 79,
  "2025-10-08": 79,
  "2025-10-09": 79,
  "2025-10-10": 79,
  "2025-10-11": 109,
};

// --- Componente principal ---
const BookingCalendar = () => {
  const navigate = useNavigate();

  // Estado de la barra
  const [activeItem, setActiveItem] = useState("Llegada");

  // Estado de fechas
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  // Estado de huésped y código
  const [guests, setGuests] = useState(1);
  const [promoCode, setPromoCode] = useState("");

  const getPrice = (year, month, day) => {
    const dateKey = formatDate(year, month, day);
    return MOCK_PRICES[dateKey] || null;
  };

  const months = [
    { name: "Septiembre 2025", daysInMonth: 30, startDayOfWeek: 0, year: 2025, month: 9 },
    { name: "Octubre 2025", daysInMonth: 31, startDayOfWeek: 3, year: 2025, month: 10 },
  ];
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  // Función al seleccionar un día
  const handleDayClick = (year, month, day) => {
    const date = formatDate(year, month, day);

 if (activeItem === "Llegada") {
      if (checkIn === date) setCheckIn(null); // desmarcar
      else {
        setCheckIn(date);
        setCheckOut(null);
        setActiveItem("Salida");
      }
    } else if (activeItem === "Salida") {
      if (checkOut === date) setCheckOut(null); // desmarcar
      else if (checkIn && date > checkIn) setCheckOut(date);
      else alert("La fecha de salida debe ser después de la llegada");
    }
  };

  // Renderizar mes
  const renderMonth = (monthData) => {
  const { daysInMonth, startDayOfWeek, year, month } = monthData;
  const days = [];

  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(<div key={`empty-${month}-${i}`} className="empty-cell"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = formatDate(year, month, day);
    const price = getPrice(year, month, day);

    const isCheckIn = dateKey === checkIn;
    const isCheckOut = dateKey === checkOut;
    const isInRange = checkIn && checkOut && dateKey > checkIn && dateKey < checkOut;

    let cellClass = "day-cell";
    if (isCheckIn) cellClass += " check-in";
    if (isCheckOut) cellClass += " check-out";
    if (isInRange) cellClass += " in-range";

    days.push(
      <div key={`${year}-${month}-${day}`} className={cellClass} onClick={() => handleDayClick(year, month, day)}>
        <span className="date">{day}</span>
        {price && <span className="price">${price}</span>}
      </div>
    );
  }

  return (
    <div className="month-block">
      <h3 className="month-title">{monthData.name}</h3>
      <div className="month-header-days">
        {dayNames.map((day) => (
          <div key={`${monthData.name}-${day}`} className="day-name">{day}</div>
        ))}
      </div>
      <div className="month-days">{days}</div>
    </div>
  );
};

  return (
    <div>
      <div>
        <div className="container">
          {/* Barra superior */}
          <div className="booking-bar-container">
            <div className="booking-bar">
              <div
                className={`booking-item ${activeItem === "Llegada" ? "active" : ""}`} onClick={() => setActiveItem("Llegada")}>

                <span className="icon">🗓️</span>
                <span className="label"> {checkIn ? `Llegada: ${checkIn}` : "Llegada"}</span>
              </div>
              <span className="arrow">→</span>

              <div
                className={`booking-item ${activeItem === "Salida" ? "active" : ""}`} onClick={() => setActiveItem("Salida")}>
                <span className="label"> {checkOut ? `Salida: ${checkOut}` : "Salida"} </span>
              </div>

              <div className="booking-item">
                <span className="icon">👤</span>
                <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} Huésped{num > 1 ? "es" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="booking-item">
                <span className="icon">🏷️</span>
                <input type="text" placeholder="Añadir código" value={promoCode} onChange={(e) => setPromoCode(e.target.value)}/>
              </div>

                <button className="search-button" onClick={() => navigate("/InfoHabit")}> Buscar</button>
              </div>

                {/* Calendario */}
              <div className="calendar-panel">
                <div className="calendar-header">
                  <button className="nav-button">←</button>
                  <h2>Selecciona fechas</h2>
                  <button className="nav-button">→</button>
                </div>

                <div className="calendar-grid">
                  {months.map((month) => (
                    <div key={month.name} className="calendar-month">
                      {renderMonth(month)}
                    </div>
                  ))}
                </div>
              </div>

          </div>

            

        </div>
      </div>
    </div>
  );
}

export default Reservas;
