
//URL base de tu API
const API_URL = 'http://localhost:4000';

export const realizarLogin  = async (usuario,contrasenia) => {
    const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, contrasenia }),
    });
    return response.json();
}


export const crearUsuario  = async (usuario,contrasenia,email) => {
    const response = await fetch(`${API_URL}/api/usuario`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, contrasenia,email }),
    });
    return response.json();
}
  
export const actualizarUsuario  = async (idUsuario,usuario,contrasenia) => {
    const response = await fetch(`${API_URL}/api/usuario/${idUsuario}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, contrasenia }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en la actualización');
    }
    return await response.json();
}

export const obtenerFacturas = async (idUsuario) => {
    const response = await fetch(`${API_URL}/api/facturas/${idUsuario}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al obtener las facturas');
    }
    return await response.json();
};