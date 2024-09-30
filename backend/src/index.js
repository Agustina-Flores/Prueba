import express from 'express'; 
import { connectToDatabase } from './database.js'; 
import cors from 'cors';
import routerFacturas from './rutas/facturasRutas.js';
import routerUsuarios from './rutas/usuarioRutas.js';
 
const PORT = 4000;
const app = express();

// Habilita CORS para todas las rutas
//permitirá que cualquier origen haga solicitudes a tu servidor
app.use(cors());
app.use(express.json()); 
app.use(routerUsuarios);
app.use(routerFacturas);

app.use(cors({
    origin: 'http://localhost:5173' 
}));


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

connectToDatabase();