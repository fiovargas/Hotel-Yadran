import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import ServicesRegister from '../../services/ServicesRegister'
import { toast } from 'react-toastify'
import SectionDivider from "../Divisiones/SectionDivider";
import './Register.css'

function Register() {

  const navegar = useNavigate()

  const [email, setEmail] = useState("")

    const cargarDatos = async () => {

    if (!email) {
      toast.error("No puedes dejar espacios vacíos")
      return
    }


    if (!email.includes("@") || !email.includes(".")) {
      toast.error("El correo debe contener '@' y '.'")
      return
    }

    try {

      const usuariosActuales = await ServicesRegister.getUsers()

      const emailExistente = usuariosActuales.find(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      )

      if (emailExistente) {
        toast.error("El correo ya está registrado")
        return
      }

      const nuevoUsuario = { email }
      await ServicesRegister.postUsers(nuevoUsuario)

      toast.success("Registro guardado con éxito")
      setEmail("")
      navegar("/Login")

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

