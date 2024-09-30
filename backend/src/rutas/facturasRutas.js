import { Router } from 'express';
import {  obtenerFacturas } from '../controladores/facturasControlador.js';

const routerFacturas = Router();
 
 
routerFacturas.get('/api/facturas/:idUsuario', obtenerFacturas);


export default routerFacturas;