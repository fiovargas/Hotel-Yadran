import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ServicesRegister from '../../services/ServicesRegister'
import { toast } from 'react-toastify'
import SectionDivider from "../Divisiones/SectionDivider";
import "./InfoHuesped.css"

function InfoHuésped() {

  const navegar = useNavigate()

  // Estados para checkbox
  const [reservaOtraPersona, setReservaOtraPersona] = useState(false)

  // Estado para la hora de llegada y comentarios
  const [horaLlegada, setHoraLlegada] = useState("");
  const [comentarios, setComentarios] = useState("");

  // Estados de quien reserva
  const [reservaNombre, setReservaNombre] = useState("")
  const [reservaApellido, setReservaApellido] = useState("")
  const [reservaEmail, setReservaEmail] = useState("")

  // Estados del huésped
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [email, setEmail] = useState("")
  const [pais, setPais] = useState("+506")
  const [telefono, setTelefono] = useState("")

    useEffect(() => {
    const usuario = localStorage.getItem("usuario")
    if (usuario) {
      navegar("/InfoHuesp", { replace: true }) // reemplaza el historial
    }
  }, [navegar])

    const cargarDatos = async () => {

      // Validación de quien reserva
    if (reservaOtraPersona && (!reservaNombre || !reservaApellido || !reservaEmail)) {
      toast.error("Completa todos los datos de quien reserva")
      return
    }

      // Validación del huésped
    if (!nombre || !apellido || !email || !telefono) {
      toast.error("Completa todos los datos del huésped")
      return
    }

    if (nombre.length < 3) {
      toast.error("El nombre debe tener mínimo 3 caracteres")
      return
    }

    if (apellido.length < 2) {
      toast.error("El apellido debe tener mínimo 2 caracteres")
      return
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast.error("El correo debe contener '@' y '.'")
      return
    }

    try {

      const usuariosActuales = await ServicesRegister.getUsers()
      console.log(usuariosActuales);
      

      const nuevoUsuario = {
        reservaOtraPersona: reservaOtraPersona
        ? { reservaNombre, reservaApellido, reservaEmail }
        : null,
        huesped: { nombre, apellido, email, numero: `${pais}${telefono}`},
        horaLlegada, 
        comentarios
      }

      console.log(nuevoUsuario);
      
      
      console.log("enviando usuario");
      
      await ServicesRegister.postUsers(nuevoUsuario)

      toast.success("Registro guardado con éxito")

      // Resetear estados
      setReservaNombre("")
      setReservaApellido("")
      setReservaEmail("")
      setNombre("")
      setApellido("")
      setPais("+506")
      setTelefono("")
      setReservaOtraPersona(false)
      setHoraLlegada("")
      setComentarios("")

      navegar("/Pago")

    } catch (error) {
      toast.error("Error al registrar el usuario")
      console.error("Error en registro:", error)
    }
  }
 
  return (
    <div>
      <div>
        <div className='info-container'>
          <h1>Información del huésped</h1>

          <div className='quienReserva'>
            <input type="checkbox" id='otraPersona' checked={reservaOtraPersona} onChange={() => setReservaOtraPersona(!reservaOtraPersona)}/>
            <label htmlFor="otraPersona">Reservo en nombre de otra persona</label>
          </div>

        {reservaOtraPersona && (
          <div className="detallesReserva">
            <h3>Detalles de quien reserva</h3>

            <input type="text" id='reservaNombre' placeholder='Nombre' value={reservaNombre} onChange={(e)=>setReservaNombre(e.target.value)} />

            <input type="text" id='reservaApellido' placeholder='Apellido' value={reservaApellido} onChange={(e)=>setReservaApellido(e.target.value)} />
            
            <input type="email" id='reservaCorreo' placeholder='Correo electrónico' value={reservaEmail} onChange={(e)=>setReservaEmail(e.target.value)} /> 
          </div>
        )}

          <div className='detallesHuesped'>
              <h3>Detalles del huésped</h3>

              <input type="text" id='nombre' placeholder='Nombre' value={nombre} onChange={(e)=>setNombre(e.target.value)} />

              <input type="text" id='apellido' placeholder='Apellido' value={apellido} onChange={(e)=>setApellido(e.target.value)} />
              
              <input type="email" id='correo' placeholder='Correo electrónico' value={email} onChange={(e)=>setEmail(e.target.value)} /> 

            <div className="telefono-inputs">
              <select 
                value={pais} onChange={(e) => setPais(e.target.value)} className="pais-select">
                <option value="+506">Costa Rica (+506)</option>
                <option value="+1">Estados Unidos (+1)</option>
                <option value="+34">España (+34)</option>
                <option value="+52">México (+52)</option>
                {/* Puedes agregar más países aquí */}
              </select>
              <input type="tel" placeholder="Número de teléfono" value={telefono} onChange={(e)=>setTelefono(e.target.value)} className="numero-input"/>
            </div>
          </div>

            <SectionDivider titulo="Estancia" />

            <div>
              <h3>Para su estancia</h3>

              <p>¿Tiene algún tipo de solicitud especial para el hotel?</p>
              <p> ¿Tiene alguna solicitud especial de movilidad o alimentaria? (Haremos nuestro mejor esfuerzo en complacer sus requerimientos)</p>
              <p>Nota: Comentarios no garantizados.</p>

              <div className="hora-llegada">
                <label htmlFor="horaLlegada">Hora de llegada:</label>
                <select
                  id="horaLlegada" value={horaLlegada} onChange={(e) => setHoraLlegada(e.target.value)} className="hora-select">

                  <option value="">Selecciona una hora</option>

                  {Array.from({ length: 48 }).map((_, i) => {
                    const hora = Math.floor(i / 2)
                      .toString()
                      .padStart(2, "0");
                    const minutos = i % 2 === 0 ? "00" : "30";
                    const value = `${hora}:${minutos}`;
                    return (
                      <option key={i} value={value}> {value}</option>
                    );
                  })}
                </select>
              </div>
              <div className="comentarios">
                <label htmlFor="comentarios">Comentarios:</label>
                <textarea
                  id="comentarios" value={comentarios} onChange={(e) => setComentarios(e.target.value)} className="comentarios-input" />
              </div>

              <SectionDivider titulo="Políticas" />

              <div>
                <h1> Políticas de cancelación y sobre la propiedad</h1>

                <p>
                  ◆ Cualquier cancelación o modificación deberá hacerse con al menos 15 días antes de la fecha de llegada, en temporada Baja.
                </p>

                <p>
                  ◆Cualquier cancelación o modificación deberá hacerse con al menos 45 días antes de la fecha de llegada, en temporada Alta.
                </p>

                <p>
                  ◆ No habrán reembolsos o crédito por las solicitudes de cancelación recibidas fuera del plazo de las fechas antes mencionadas.
                </p>

                <p>
                  ◆ Las cancelaciones serán efectivas a partir del momento en que se reciba
                    notificación por escrito, al e-mail reservas@hotelyadrancr.com de nuestro
                    departamento de Reservaciones y confirmación recibida por parte de
                    nuestro hotel.
                </p>

              </div>

            </div>
            <div className='btn-container'>
              <button className="btn-continuar" onClick={cargarDatos}>Continuar y pagar</button>
            </div>
        </div>
          
      </div>
    </div>
  )
}

export default InfoHuésped
