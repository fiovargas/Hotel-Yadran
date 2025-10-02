// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const usuario = localStorage.getItem("usuario"); // 👈 validamos usuario guardado

  if (!usuario) {
    // si no existe usuario, redirigimos a login
    return <Navigate to="/login" replace />;
  }

  return children; // si existe, mostramos el contenido
}

export default PrivateRoute;
