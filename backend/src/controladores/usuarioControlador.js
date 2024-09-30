import { sql } from '../database.js';

export const crearUsuario = async (req, res) => {
    const { usuario, contrasenia, email } = req.body;

    // Validar  campos
    if (!usuario || !contrasenia || !email || 
        usuario.trim() === "" || contrasenia.trim() === "" || email.trim() === "") {
        return res.status(400).json({ error: 'Los campos obligatorios: usuario, contrasenia o email no pueden estar vacíos.' });
    }

    try { 
        const result = await sql.query`INSERT INTO Usuarios (usuario, contrasenia, email) OUTPUT INSERTED.idUsuario VALUES (${usuario}, ${contrasenia}, ${email})`;
        res.status(201).json({ idUsuario: result.recordset[0].idUsuario, usuario, email });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}; 
 
export const actualizarUsuario= async (req, res) => {
    const { idUsuario } = req.params;
    const { usuario, contrasenia } = req.body;
    
    // Validar 
    if (!idUsuario || idUsuario.trim() === "") {
        return res.status(400).json({ error: 'Campo obligatorio: id.' });
    }
    
     if (!usuario && !contrasenia) {
     return res.status(400).json({ error: 'Al menos uno de los campos: usuario, contrasenia es obligatorio para actualizar.' });
     }  

    try {
    
        const updates = [];  
        const params = [];
       
        if (usuario) {
            updates.push(`usuario = ?`);
            params.push(usuario);
        }
        if (contrasenia) {
            updates.push(`contrasenia = ?`);
            params.push(contrasenia);
        }
       
        if (updates.length === 0) {
            return res.status(400).json({ error: 'No hay campos para actualizar.' });
        }
       
        const sqlQuery = `UPDATE Usuarios SET ${updates.join(', ')} WHERE idUsuario = ?`;
        params.push(idUsuario); 
       
        const result = await sql.query(sqlQuery, params);
       
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        res.json({ idUsuario, usuario,contrasenia });
  
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const obtenerCliente = async (req, res) => {
    const { idUsuario } = req.params; 

    
    if (!idUsuario || idUsuario.trim() === "") {
        return res.status(400).json({ error: 'Campo obligatorio: id.' });
    }

    try {
        
        const result = await sql.query`SELECT * FROM Usuarios WHERE idUsuario = ${idUsuario}`;
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const realizarLogin= async (req, res) => {
    const { usuario, contrasenia } = req.body;
    if (!usuario || !contrasenia) {
        return res.status(400).json({ error: 'Campos obligatorios: usuario y contrasenia.' });
    }
    
    try { 
        const result = await sql.query`SELECT * FROM Usuarios WHERE usuario = ${usuario} AND contrasenia = ${contrasenia}`;
        if (result.recordset.length === 0) 
        return res.status(401).json({ error: 'Credenciales inválidas' });
        res.json({ message: 'Log-in exitoso', usuario: result.recordset[0] });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
