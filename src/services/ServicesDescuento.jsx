export default { getDescuentos };

// GET - Obtener todos los códigos de descuento
async function getDescuentos() {
  try {
    const response = await fetch('http://localhost:3001/descuentos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error("Error al obtener los descuentos");

    const descuentos = await response.json();
    return descuentos;
  } catch (error) {
    console.error("Error al obtener los descuentos", error);
    throw error;
  }
}