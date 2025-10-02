export default {getUsers}

async function getUsers() { 
    
    try {
        const response = await fetch('http://localhost:3001/UsuariosAdmin', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Error en la respuesta del servidor");
        }

        const users = await response.json();
        return users;    
    } catch (error) {
        console.error("Existe un error al obtener los usuarios", error);
        throw error;
    }
        
}


