import React from 'react'
import { toast } from 'react-toastify'
import "./Inicio.css";
import inicioImg from "../../assets/hotel.jpg";
import bienvenida2Img from "../../assets/FotoBienvenida2.jpg"
import bienvenidaImg from "../../assets/FotoBienvenida.jpg"
import bienvenida3Img from "../../assets/FotoBienvenida3.jpg"

function Inicio() {
  return (
    <div>
      <div className="inicio-galeria">
        <img src={inicioImg} alt="Hotel Yadran" className="inicio-img"/>
      </div>
      <div className='ImgBienvenida'>
        <img src={bienvenida2Img} alt="Hotel Yadran"/>
        <img src={bienvenidaImg} alt="Hotel Yadran"/>
        <img src={bienvenida3Img} alt="Hotel Yadran"/>
      </div>

      <h3 className='Titulo'>YOUR GATEWAY TO SERENITY • YOUR GATEWAY TO SERENITY •</h3>
      <div className="inicio-texto">
        <p>
        Bienvenido al Hotel Yadran, donde la comodidad se
        encuentra con la tranquilidad ubicado en el corazón
        de una ciudad bulliciosa, nuestro hotel ofrece un
        refugio tranquilo tanto para viajeros de negocios
        como de placer. Con comodidades modernas y un
        ambiente cálido y acogedor, nos esforzamos por
        hacer que su estadía con nosotros sea maravillosa.
        </p>
      </div>
    </div>
    

    
  )
}

export default Inicio
