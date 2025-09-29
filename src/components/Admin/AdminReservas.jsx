import React, { useEffect, useState } from "react";
import ServicesReservas from '../../services/ServicesReservas'
import { useNavigate } from "react-router-dom";
import './AdminReservas.css'

function AdminReservas() {

  const navigate = useNavigate();

  const [reservas, setReservas] = useState([]);
  const [form, setForm] = useState({ nombre: "", email: "", checkIn: "", checkOut: "", habitacion: "" });
  const [section, setSection] = useState("inicio"); // controla qué se muestra
  const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");
  };


  const habitaciones = ["Ocean View Eco", "Standard Eco", "Ocean View Double", "Ocean View Family", "Standard Family", "Honey Moon Suite"];

  // Traer reservas al cargar
  useEffect(() => {
    cargarReservas();
  }, []);

  const cargarReservas = async () => {
    try {
      const data = await ServicesReservas.getReservas();
      setReservas(data);
    } catch (error) {
      console.error("Error cargando reservas:", error);
    }
  };

  // Manejar cambios en el formulario
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
  // Agregar nueva reserva
  const handleAdd = async () => {
    try {
      await ServicesReservas.postReserva(form);
      setForm({ nombre: "", email: "", checkIn: "", checkOut: "", habitacion: "" });
      cargarReservas();
      setSection("reservas"); // redirige a la tabla después de agregar
    } catch (error) {
      console.error("Error agregando reserva:", error);
    }
  };

  // Eliminar reserva
  const handleDelete = async (id) => {
    try {
      await ServicesReservas.deleteReserva(id);
      cargarReservas();
    } catch (error) {
      console.error("Error eliminando reserva:", error);
    }
  };


  const today = new Date().toISOString().split("T")[0];

    // Función para cambiar sección y cerrar menú (en móvil)
  const handleMenuClick = (sec) => {
    setSection(sec);
    if (window.innerWidth <= 768) setMenuOpen(false);
  }

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
                </ul>
                <button className="btnLogout" onClick={handleLogout}>Cerrar sesión</button>
            </aside>

                {section === "inicio" && <h1>Bienvenido a la administración de reservas</h1>}
        
            {section === "add" && (
                <div>
                    <h2>Agregar nueva reserva</h2>
                    <div className="reservas-H">
                    <label>Nombre del huésped</label>
                    <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />

                    <label>Correo Electrónico</label>
                    <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />

                    <label>Fecha Entrada</label>
                    <input type="date" name="checkIn" value={form.checkIn} min={today} onChange={handleChange} />

                    <label>Fecha Salida</label>
                    <input type="date" name="checkOut" value={form.checkOut} min={form.checkIn || today} onChange={handleChange} />

                    <label>Habitación</label>
                    <select name="habitacion" value={form.habitacion} onChange={handleChange}>
                        <option value="">Seleccione una habitación</option>
                        {habitaciones.map((hab, i) => (
                        <option key={i} value={hab}>{hab}</option>
                        ))}
                    </select>

                    <label>Huésped</label>
                    <input type="text" name="huesped" placeholder="Huésped" value={form.huesped} onChange={handleChange} />

                    <button className="btn" onClick={handleAdd}>Agregar</button>
                    </div>
                </div>
                )}  

     {section === "reservas" && (
          <div>
            <h2>Reservas existentes</h2>
            <table border="1">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Fecha Llegada</th>
                  <th>Fecha Salida</th>
                  <th>Habitación</th>
                  <th>Huésped</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map(reserva => (
                  <tr key={reserva.id}>
                    <td>{reserva.nombre}</td>
                    <td>{new Date(reserva.checkIn).toLocaleDateString("es-CR")}</td>
                    <td>{new Date(reserva.checkOut).toLocaleDateString("es-CR")}</td>
                    <td>{reserva.habitacion}</td>
                    <td>{reserva.huesped}</td>
                    <td>
                      <button className="btn" onClick={() => handleDelete(reserva.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </div>
    </div>
  )
}

export default AdminReservas
