 
import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};
 
console.log('DB_SERVER:', process.env.DB_SERVER);

const connectToDatabase = async () => {
    try {
        await sql.connect(dbConfig);
        console.log('Conectado a la base de datos');
    } catch (err) {
        console.error('Error en la conexión: ', err);
    }
};

export { sql, connectToDatabase };