import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Reservas.css"

function Reservas() {
  return <BookingCalendar />;
}

// --- Formatea fecha a string YYYY-MM-DD ---
const formatDate = (year, month, day) =>
  `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

const MOCK_PRICES = {
  "2025-10-01": 79, "2025-10-02": 79, "2025-10-03": 79, "2025-10-04": 109, "2025-10-05": 79,
  "2025-10-06": 79, "2025-10-07": 79, "2025-10-08": 79, "2025-10-09": 79, "2025-10-10": 79,
  "2025-10-11": 109, "2025-10-12": 79, "2025-10-13": 79, "2025-10-14": 79, "2025-10-15": 79, 
  "2025-10-16": 79, "2025-10-17": 79, "2025-10-18": 109, "2025-10-19": 79, "2025-10-20": 79, 
  "2025-10-21": 79, "2025-10-22": 79, "2025-10-23": 79, "2025-10-24": 79, "2025-10-25": 109, 
  "2025-10-26": 79, "2025-10-27": 79, "2025-10-28": 79, "2025-10-29": 79, "2025-10-30": 79, "2025-10-31": 79,

  "2025-11-01": 109, "2025-11-02": 79, "2025-11-03": 79, "2025-11-04": 79, "2025-11-05": 79,
  "2025-11-06": 79, "2025-11-07": 79, "2025-11-08": 109, "2025-11-09": 79, "2025-11-10": 79,
  "2025-11-11": 79, "2025-11-12": 79, "2025-11-13": 79, "2025-11-14": 79, "2025-11-15": 109, 
  "2025-11-16": 79, "2025-11-17": 79, "2025-11-18": 79, "2025-11-19": 79, "2025-11-20": 79, 
  "2025-11-21": 79, "2025-11-22": 109, "2025-11-23": 79, "2025-11-24": 79, "2025-11-25": 79, 
  "2025-11-26": 79, "2025-11-27": 79, "2025-11-28": 79, "2025-11-29": 109, "2025-11-30": 79,

  "2025-12-01": 79, "2025-12-02": 79, "2025-12-03": 79, "2025-12-04": 79, "2025-12-05": 79,
  "2025-12-06": 79, "2025-12-07": 109, "2025-12-08": 79, "2025-12-09": 79, "2025-12-10": 79,
  "2025-12-11": 79, "2025-12-12": 79, "2025-12-13": 79, "2025-12-14": 109, "2025-12-15": 79, 
  "2025-12-16": 79, "2025-12-17": 79, "2025-12-18": 79, "2025-12-19": 79, "2025-12-20": 79, 
  "2025-12-21": 109, "2025-12-22": 79, "2025-12-23": 79, "2025-12-24": 79, "2025-12-25": 79, 
  "2025-12-26": 79, "2025-12-27": 79, "2025-12-28": 109, "2025-12-29": 79, "2025-12-30": 79, "2025-12-31": 79,
};

const getGuestRange = (capacidadStr) => {
  const nums = capacidadStr.match(/\d+/g);
  if (!nums || nums.length === 0) return { min: 1, max: 1 };
  if (nums.length === 1) return { min: Number(nums[0]), max: Number(nums[0]) };
  return { min: Number(nums[0]), max: Number(nums[1]) };
};

// --- Componente principal ---
const BookingCalendar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const habitacion = location.state?.habitacion;

  // Estado de la barra
  const [activeItem, setActiveItem] = useState("Llegada");

  // Estado de fechas
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  // Estado de huésped y código
  const { min: minGuests, max: maxGuests } = habitacion ? getGuestRange(habitacion.capacidad) : { min: 1, max: 1 };
  const [guests, setGuests] = useState(minGuests);
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    setGuests(minGuests);
  }, [habitacion]);

  const calcularNoches = (inicio, fin) => {
    if (!inicio || !fin) return 0;
    const start = new Date(inicio);
    const end = new Date(fin);
    const diff = end - start;
    return diff > 0 ? diff / (1000 * 60 * 60 * 24) : 0;
  };

  const calcularTotal = () => {
    const noches = calcularNoches(checkIn, checkOut);
    let total = (habitacion?.precio || 0) * noches * guests;
    if (promoCode === "DESC10") total *= 0.9;
    return total;
  };

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

  const getPrice = (year, month, day) => {
    const dateKey = formatDate(year, month, day);
    return MOCK_PRICES[dateKey] || null;
  };

  const months = [
    { name: "Octubre 2025", daysInMonth: 31, startDayOfWeek: 3, year: 2025, month: 10 },
    { name: "Noviembre 2025", daysInMonth: 30, startDayOfWeek: 6, year: 2025, month: 11 },
    { name: "Diciembre 2025", daysInMonth: 31, startDayOfWeek: 0, year: 2025, month: 12 },
  ];
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];



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

  // 🔹 Pasar datos al resumen
  const handleConfirmar = () => {
    if (!habitacion || !checkIn || !checkOut) {
      alert("Completa la habitación y las fechas antes de continuar");
      return;
    }

    const nights = [];
    for (let time = new Date(checkIn).getTime(); time < new Date(checkOut).getTime(); time += 24*60*60*1000) {
      const d = new Date(time);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const dateKey = `${yyyy}-${mm}-${dd}`;
      const precioDia = MOCK_PRICES[dateKey] || habitacion.precio || 0;
      nights.push({ date: dateKey, precio: precioDia });
    }

    let subtotal = nights.reduce((acc, n) => acc + n.precio, 0);
    if (promoCode === "DESC10") subtotal *= 0.9;
    const impuestos = subtotal * 0.13;
    const total = subtotal + impuestos;
    const deposito = total * 0.3;

    navigate("/InfoReserva", {
      state: {
        habitacion,
        checkIn,
        checkOut,
        guests,
        nights,     
        subtotal,
        impuestos,
        total,
        deposito,
        promoCode
      },
    });
  };


  return (
    <div>
      <div>
        <div className="container-g">
          {habitacion && (
            <div className="habitacion-resumen">
              <h2>{habitacion.nombre}</h2>
            </div>
          )}
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

              {habitacion && (
                <div className="booking-item">
                  <span className="icon">👤</span>
                  <select 
                    value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                    {[...Array(maxGuests)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1} Huésped{i + 1 > 1 ? "es" : ""}
                      </option>
                    ))}
                  </select>
                    <p className="max-guests-text">Máx. {habitacion.capacidad} huésped{habitacion.capacidad > 1 ? "es" : ""}</p>

                </div>
              )}

              <div className="booking-item">
                <span className="icon">🏷️</span>
                <input type="text" placeholder="Añadir código" value={promoCode} onChange={(e) => setPromoCode(e.target.value)}/>
              </div>

                <button className="search-button" onClick={(handleConfirmar)}> Reservar </button>
              </div>

                {/* Calendario */}
              <div className="calendar-panel">
                <div className="calendar-header">
                  <h2>Selecciona fechas</h2>
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
