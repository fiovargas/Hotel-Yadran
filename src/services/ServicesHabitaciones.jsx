export default { getHabitaciones }

// GET - Obtener todas las habitaciones
async function getHabitaciones() {
  try {
    const response = await fetch('http://localhost:3001/habitaciones', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) throw new Error("Error al obtener las habitaciones")

    const habitaciones = await response.json()
    return habitaciones
  } catch (error) {
    console.error("Error al obtener las habitaciones", error)
    throw error
  }
}