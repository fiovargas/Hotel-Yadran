import React from 'react'
import "./SectionDivider.css";

function SectionDivider({titulo}) {
  return (
    <div>
        <div className="section-divider">
            <hr className="line" />
            {titulo && <span className="divider-titulo">{titulo}</span>}
            <hr className="line" />
        </div>
    </div>
  )
}

export default SectionDivider
