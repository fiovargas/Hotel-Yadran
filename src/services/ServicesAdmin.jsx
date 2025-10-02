export default { getReservas, postReserva, patchReserva, deleteReserva }

// GET - Obtener todas las reservas
async function getReservas() {
  try {
    const response = await fetch('http://localhost:3001/Reservas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) throw new Error("Error al obtener las reservas")

    const reservas = await response.json()
    return reservas
  } catch (error) {
    console.error("Error al obtener las reservas", error)
    throw error
  }
}

// POST - Crear nueva reserva
async function postReserva(infoReserva) {
  try {
    const response = await fetch('http://localhost:3001/Reservas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(infoReserva)
    })

    if (!response.ok) throw new Error("Error al crear la reservas")

    const reservas = await response.json()
    return reservas
  } catch (error) {
    console.error("Error al crear la reservas", error)
    throw error
  }
}

// PATCH - Editar una reservas por id
async function patchReserva(id, nuevaReserva) {
  try {
    const response = await fetch(`http://localhost:3001/Reservas/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevaReserva)
    })

    if (!response.ok) throw new Error("Error al editar la reservas")

    const reservaEditada = await response.json()
    return reservaEditada
  } catch (error) {
    console.error("Error al editar la reservas", error)
    throw error
  }
}

// DELETE - Eliminar una reserva por id
async function deleteReserva(id) {
  try {
    const response = await fetch(`http://localhost:3001/Reservas/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) throw new Error("Error al eliminar la reserva")

    return true
  } catch (error) {
    console.error("Error al eliminar la reserva", error)
    throw error
  }
}