export default { getHabitaciones, postHabitacion, patchHabitacion, deleteHabitacion }



// POST - Crear nueva habitación
async function postHabitacion(infoHabitacion) {
  try {
    const response = await fetch('http://localhost:3001/habitaciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(infoHabitacion)
    })

    if (!response.ok) throw new Error("Error al crear la habitación")

    const habitacion = await response.json()
    return habitacion
  } catch (error) {
    console.error("Error al crear la habitación", error)
    throw error
  }
}

// PATCH - Editar una habitación por id
async function patchHabitacion(id, nuevaHabitacion) {
  try {
    const response = await fetch(`http://localhost:3001/habitaciones/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevaHabitacion)
    })

    if (!response.ok) throw new Error("Error al editar la habitación")

    const habitacionEditada = await response.json()
    return habitacionEditada
  } catch (error) {
    console.error("Error al editar la habitación", error)
    throw error
  }
}

// DELETE - Eliminar una habitación por id
async function deleteHabitacion(id) {
  try {
    const response = await fetch(`http://localhost:3001/habitaciones/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) throw new Error("Error al eliminar la habitación")

    return true
  } catch (error) {
    console.error("Error al eliminar la habitación", error)
    throw error
  }
}