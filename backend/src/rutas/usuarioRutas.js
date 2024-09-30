import { Router } from 'express';
import { crearUsuario,actualizarUsuario,obtenerCliente,realizarLogin } from '../controladores/usuarioControlador.js';  
 
const routerUsuarios = Router();

routerUsuarios.post('/api/usuario', crearUsuario);
routerUsuarios.put('/api/usuario/:idUsuario', actualizarUsuario);
routerUsuarios.get('/api/usuarios/:idUsuario',obtenerCliente);
routerUsuarios.post('/api/login', realizarLogin);

export default routerUsuarios;