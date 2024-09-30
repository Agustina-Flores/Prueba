import { sql } from '../database.js';

export const obtenerFacturas = async (req, res) => {

    const { idUsuario } = req.params;

    try {
        
        const result = await sql.query`SELECT * FROM Factura WHERE cliente = ${idUsuario}`;

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'No se encontraron facturas para este usuario.' });
        }
      
        return res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};