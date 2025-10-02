import React, { useEffect, useState } from "react";
import ServicesAdminReservas from '../../services/ServicesReservas'
import { useLocation, useNavigate } from "react-router-dom";
import headerImg from '../../assets/Logohotel.png'
import { toast } from 'react-toastify'
import './AdminReservas.css'

function AdminReservas() {

  const location = useLocation();
  const reserva = location.state;

  const [reservas, setReservas] = useState([]);
  const [form, setForm] = useState({ nombre: "", email: "", checkIn: "", checkOut: "", habitacion: "", huesped: "" });
  const [section, setSection] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const [editReserva, setEditReserva] = useState(null);

  const habitaciones = [
    { nombre: "Ocean View Eco", capacidad: 4 },
    { nombre: "Standard Eco", capacidad: 2 },
    { nombre: "Ocean View Double", capacidad: 2 },
    { nombre: "Ocean View Family", capacidad: 5 },
    { nombre: "Standard Family", capacidad: 4 },
    { nombre: "Honey Moon Suite", capacidad: 2 },
  ];

  // Traer reservas al cargar
useEffect(() => {
  const cargar = async () => {
    let reservasBackend = [];
    try {
      reservasBackend = await ServicesAdminReservas.getReservas();
    } catch (error) {
      toast.error("Error al cargar reservas ❌");
      console.error(error);
    }

    const datosLocal = localStorage.getItem("reservaCompleta");
    const reservaLocal = datosLocal ? JSON.parse(datosLocal) : null;

    let nuevasReservas = [...reservasBackend];

    if (reservaLocal) {
      const nuevaReserva = {
        id: Date.now(),
        nombre: reservaLocal.huesped?.nombre || reservaLocal.nombre,
        email: reservaLocal.huesped?.email || reservaLocal.email,
        checkIn: reservaLocal.checkIn,
        checkOut: reservaLocal.checkOut,
        habitacion: reservaLocal.habitacion?.nombre || reservaLocal.habitacion,
        huesped: reservaLocal.huesped?.numero || reservaLocal.huesped,
        estado: "pendiente"
      };
      nuevasReservas.push(nuevaReserva);
      localStorage.removeItem("reservaCompleta");
    }

    setReservas(nuevasReservas);
  }

  cargar();
}, []);

  const cargarReservas = async () => {
    try {
      const data = await ServicesAdminReservas.getReservas();
      setReservas(data);
    } catch (error) {
      toast.error("Error al cargar reservas ❌");
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => {
      const updated = { ...prev, [name]: value };

      // Si se cambia la fecha de entrada, ajustar fecha de salida si es menor
      if(name === "checkIn" && updated.checkOut && updated.checkOut < value) {
        updated.checkOut = value;
      }
      return updated;
  });
};

// Validar que el formulario tenga datos correctos
  const isFormValid = (data) => {
    if (!data) return false;
    return data.nombre?.trim().length >= 2 &&
           data.email?.includes("@") &&
           data.checkIn &&
           data.checkOut &&
           data.habitacion &&
           data.huesped;
  };

  // Agregar nueva reserva
const handleAdd = async () => {
  // --- Validaciones ---
  if (!form.nombre || form.nombre.trim().length < 2) {
    toast.error("El nombre del huésped debe tener mínimo 2 caracteres");
    return;
  }

  if (!form.email || !form.email.includes("@")) {
    toast.error("Ingresa un correo válido");
    return;
  }

  if (!form.checkIn || !form.checkOut) {
    toast.error("Selecciona fechas de entrada y salida");
    return;
  }

  if (!form.habitacion) {
    toast.error("Selecciona una habitación");
    return;
  }

  if (!form.huesped) {
    toast.error("Selecciona la cantidad de huéspedes");
    return;
  }

    try {
    // Quitar espacios innecesarios
    const nueva = {
      nombre: form.nombre.trim(),
      email: form.email.trim(),
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      habitacion: form.habitacion,
      huesped: form.huesped,
      estado: "pendiente",
    };

     const nuevaCreada = await ServicesAdminReservas.postReserva(nueva);
    setReservas(prev => [...prev, nuevaCreada]);

    // Limpiar formulario y recargar reservas
    setForm({ nombre: "", email: "", checkIn: "", checkOut: "", habitacion: "", huesped: "" });
    setSection("pendientes");
    toast.success("Reserva agregada correctamente ✅");
  } catch (error) {
    console.error("Error agregando reserva:", error);
    toast.error("Error al agregar la reserva ❌");
  }
};

  const handleEdit = (reserva) => {
    setEditReserva(reserva);
    setSection("edit"); 
  };

const handleUpdate = async () => {
  // --- Validaciones ---
    if (!isFormValid(editReserva)) {
      toast.error("Completa todos los campos correctamente ❌");
      return;
    }

  if (!editReserva.nombre || editReserva.nombre.trim().length < 2) {
    toast.error("El nombre del huésped debe tener mínimo 2 caracteres");
    return;
  }

  if (!editReserva.email || !editReserva.email.includes("@")) {
    toast.error("Ingresa un correo válido");
    return;
  }

  if (!editReserva.checkIn || !editReserva.checkOut) {
    toast.error("Selecciona fechas de entrada y salida");
    return;
  }

  if (!editReserva.habitacion) {
    toast.error("Selecciona una habitación");
    return;
  }

  if (!editReserva.huesped) {
    toast.error("Selecciona la cantidad de huéspedes");
    return;
  }

  try {
    // Limpiar espacios antes de enviar
    const reservaActualizada = {
      ...editReserva,
      nombre: editReserva.nombre.trim(),
      email: editReserva.email.trim(),
    };

    await ServicesAdminReservas.patchReserva(editReserva.id, reservaActualizada);

    setEditReserva(null);
    setSection("reservas");
    cargarReservas();
    toast.success("Reserva actualizada correctamente ✅");
  } catch (error) {
    console.error("Error actualizando reserva:", error);
    toast.error("Error al actualizar reserva ❌");
  }
};

  const estaDisponible = (habitacion, checkIn, checkOut) => {
    return !reservas.some(r =>
      r.estado === "aceptada" &&
      r.habitacion === habitacion &&
      !(new Date(checkOut) <= new Date(r.checkIn) || new Date(checkIn) >= new Date(r.checkOut))
    );
  };

// Toast de confirmación antes de aceptar
const confirmAceptar = (id) => {
  toast.info(
    ({ closeToast }) => (
      <div className="toast-confirm">
        <p>¿Seguro que quieres aceptar la reserva?</p>
        <div className="toast-confirm-buttons">
          <button
            className="btn"
            style={{ backgroundColor: "#28a745" }} // verde
            onClick={async () => {
              try {
                const reserva = reservas.find(r => r.id === id);
                if (!estaDisponible(reserva.habitacion, reserva.checkIn, reserva.checkOut)) {
                  toast.error("La habitación no está disponible en esas fechas.");
                  return;
                }
                await ServicesAdminReservas.patchReserva(id, { estado: "aceptada" });
                toast.success("Reserva aceptada correctamente ✅");
                cargarReservas();
              } catch (error) {
                toast.error("Error al aceptar la reserva ❌");
                console.error(error);
              }
              closeToast();
            }}
          >Sí</button>
          <button className="btn" style={{ backgroundColor: "#6c757d" }} onClick={closeToast}>No</button>
        </div>
      </div>
    ),
    { autoClose: false, closeOnClick: false }
  );
};

// Toast de confirmación antes de rechazar
const confirmRechazar = (id) => {
  toast.info(
    ({ closeToast }) => (
      <div className="toast-confirm">
        <p>¿Seguro que quieres rechazar la reserva?</p>
        <div className="toast-confirm-buttons">
          <button
            className="btn"
            style={{ backgroundColor: "#d9534f" }} // rojo
            onClick={async () => {
              try {
                await ServicesAdminReservas.patchReserva(id, { estado: "rechazada" });
                toast.info("Reserva rechazada ❌");
                cargarReservas();
              } catch (error) {
                toast.error("Error al rechazar reserva ❌");
                console.error(error);
              }
              closeToast();
            }}
          >Sí</button>
          <button className="btn" style={{ backgroundColor: "#6c757d" }} onClick={closeToast}>No</button>
        </div>
      </div>
    ),
    { autoClose: false, closeOnClick: false }
  );
};

  // Toast de confirmación antes de eliminar
const confirmDelete = (id) => {
  toast.info(
    ({ closeToast }) => (
      <div className="toast-confirm">
        <p>¿Seguro que quieres eliminar la reserva?</p>
        <div className="toast-confirm-buttons">
          <button
            className="toast-btn toast-btn-yes"
            onClick={async () => {
              try {
                await ServicesAdminReservas.deleteReserva(id);
                cargarReservas();
                toast.success("Reserva eliminada ✅");
              } catch (error) {
                toast.error("Ocurrió un error al eliminar la reserva ❌");
              }
              closeToast(); // cerrar el toast
            }}
          >Sí</button>
          <button className="toast-btn toast-btn-no" onClick={closeToast}>No</button>
        </div>
      </div>
    ),
    { autoClose: false, closeOnClick: false }
  );
};

  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <div className="adminLayout">
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        <aside className={`menuLateral ${menuOpen ? "open" : ""}`}>
          <h2>Menú</h2>
          <ul>
            <li onClick={() => setSection("inicio")}>Inicio</li>
            <li onClick={() => setSection("add")}>Añadir reserva</li>
            <li onClick={() => setSection("reservas")}>Reservas existentes</li>
            <li onClick={() => setSection("pendientes")}>Pendientes</li>
          </ul>
          <button className="btnLogout" onClick={handleLogout}>Cerrar sesión</button>
        </aside>

        <div className="contenido-admin">
          {section === "inicio" && (
            <div className="inicio-container">
              <h1>Administración de reservas</h1>
              <img className="Logo" src={headerImg} alt="Hotel Yadran"/>
            </div>
          )}

          {section === "add" && (
            <div className="form-container">
              <h2>Agregar nueva reserva</h2>
              <div className="reservas-H">
                <label>Nombre del huésped</label>
                <input type="text" name="nombre" value={form.nombre} onChange={handleChange} />
                <label>Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} />
                <label>Fecha Entrada</label>
                <input type="date" name="checkIn" value={form.checkIn} min={today} onChange={handleChange} />
                <label>Fecha Salida</label>
                <input type="date" name="checkOut" value={form.checkOut} min={form.checkIn || today} onChange={handleChange} />
                <label>Habitación</label>
                <select name="habitacion" value={form.habitacion} onChange={handleChange}>
                  <option value="">Seleccione una habitación</option>
                  {habitaciones.map((hab, i) => (
                    <option key={i} value={hab.nombre}>{hab.nombre} (capacidad {hab.capacidad})</option>
                  ))}
                </select>
                {form.habitacion && (
                  <>
                    <label>Huéspedes</label>
                    <select name="huesped" value={form.huesped} onChange={handleChange}>
                      <option value="">Seleccione cantidad</option>
                      {Array.from({ length: habitaciones.find(h => h.nombre === form.habitacion)?.capacidad || 1 }, (_, i) => i + 1).map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </>
                )}
                <button className="btn" onClick={handleAdd} disabled = {!isFormValid(form)}>Agregar</button>
              </div>
            </div>
          )}

          {section === "pendientes" && (
            <div className="form-container">
              <h2>Reservas pendientes</h2>
              <table border="1">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Fecha Llegada</th>
                    <th>Fecha Salida</th>
                    <th>Habitación</th>
                    <th>Huéspedes</th>
                  </tr>
                </thead>
                <tbody>
                  {reservas.filter(r => r.estado === "pendiente").map(reserva => (
                    <tr key={reserva.id}>
                      <td>{reserva.nombre}</td>
                      <td>{new Date(reserva.checkIn).toLocaleDateString("es-CR")}</td>
                      <td>{new Date(reserva.checkOut).toLocaleDateString("es-CR")}</td>
                      <td>{reserva.habitacion}</td>
                      <td>{reserva.huesped}</td>
                      <td>
                        <button className="btn" onClick={() => confirmAceptar(reserva.id)}>Aceptar</button>
                        <button className="btn" onClick={() => confirmRechazar(reserva.id)}>Rechazar</button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {section === "reservas" && (
            <div className="form-container">
              <h2>Reservas existentes</h2>
              <table border="1">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Fecha Llegada</th>
                    <th>Fecha Salida</th>
                    <th>Habitación</th>
                    <th>Huésped</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {reservas.filter(r => r.estado === "aceptada" || r.estado === "rechazada").map(reserva => (
                    <tr key={reserva.id}>
                      <td>{reserva.nombre}</td>
                      <td>{new Date(reserva.checkIn).toLocaleDateString("es-CR")}</td>
                      <td>{new Date(reserva.checkOut).toLocaleDateString("es-CR")}</td>
                      <td>{reserva.habitacion}</td>
                      <td>{reserva.huesped}</td>
                      <td>{reserva.estado}</td>
                      <td>
                        <button className="btn" onClick={() => handleEdit(reserva)}>Editar</button>
                        <button className="btn" onClick={() => confirmDelete(reserva.id)}>Eliminar</button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {section === "edit" && editReserva && (
            <div className="form-container">
              <h2>Editar reserva</h2>
              <div className="reservas-H">
                <label>Nombre del huésped</label>
                <input type="text" value={editReserva.nombre} onChange={(e) => setEditReserva({ ...editReserva, nombre: e.target.value })} />
                <label>Email</label>
                <input type="email" value={editReserva.email} onChange={(e) => setEditReserva({ ...editReserva, email: e.target.value })} />
                <label>Fecha Entrada</label>
                <input type="date" value={editReserva.checkIn} onChange={(e) => setEditReserva({ ...editReserva, checkIn: e.target.value })} />
                <label>Fecha Salida</label>
                <input type="date" value={editReserva.checkOut} onChange={(e) => setEditReserva({ ...editReserva, checkOut: e.target.value })} />
                <label>Habitación</label>
                <select value={editReserva.habitacion} onChange={(e) => setEditReserva({ ...editReserva, habitacion: e.target.value })}>
                  {habitaciones.map((hab, i) => (
                    <option key={i} value={hab.nombre}>{hab.nombre} (capacidad {hab.capacidad})</option>
                  ))}
                </select>
                <label>Huéspedes</label>
                <select value={editReserva.huesped} onChange={(e) => setEditReserva({ ...editReserva, huesped: e.target.value })}>
                  {Array.from({ length: habitaciones.find(h => h.nombre === editReserva.habitacion)?.capacidad || 1 }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
                <label>Estado</label>
                <select value={editReserva.estado} onChange={(e) => setEditReserva({ ...editReserva, estado: e.target.value })}>
                  <option value="aceptada">Aceptada</option>
                  <option value="rechazada">Rechazada</option>
                </select>
                <div>
                  <button className="btn" onClick={handleUpdate} disabled={!isFormValid(editReserva)}>Guardar cambios</button>
                  <button className="btn" onClick={() => setSection("reservas")}>Cancelar</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminReservas
