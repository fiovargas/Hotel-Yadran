import React, { useState } from 'react';
import ServicesRegister from '../../services/ServicesRegister'
import { toast } from 'react-toastify'
import SectionDivider from "../Divisiones/SectionDivider";
import './Register.css'

function Register() {

  const [email, setEmail] = useState("")

  // --- Expresión regular básica para correos ---
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const cargarDatos = async () => {
    const correo = email.trim();

    if (!correo) {
      toast.error("No puedes dejar espacios vacíos");
      return;
    }

    if (!emailRegex.test(correo)) {
      toast.error("Por favor ingresa un correo válido");
      return;
    }

    try {

      const usuariosActuales = await ServicesRegister.getUsers();

      const emailExistente = usuariosActuales.find(
        (user) => (user.email || "").toLowerCase() === correo.toLowerCase()
      )

      if (emailExistente) {
        toast.error("El correo ya está registrado")
        return
      }

      const nuevoUsuario = {    
        email: correo 
      };
      const creado = await ServicesRegister.postUsers(nuevoUsuario)

      toast.success("Registro guardado con éxito")
      setEmail("")
      console.log("Usuario creado", creado);
      

    } catch (error) {
      toast.error("Error al registrar el usuario")
      console.error("Error en registro:", error)
    }
  }

  return (
    <div>
      <div className='contenedorSus'>
        <h1 className='tituloSub'>Suscribirse</h1>
        <p className='pDes'>¡Obtén un descuento de 10 % en tu primera compra al inscribirte para recibir nuestro boletín informativo!</p>
    
        <input type="email" id='email' placeholder='Correo Electrónico' value={email} onChange={(e)=>setEmail(e.target.value)} />

        <button className='btn' onClick={cargarDatos}>Registrarse</button>
      </div>
        <SectionDivider titulo="Información"/>    
    </div>
  )
}

export default Register

