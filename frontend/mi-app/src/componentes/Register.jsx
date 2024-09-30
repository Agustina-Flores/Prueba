import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { crearUsuario } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Paper,Typography,TextField,Button  } from '@mui/material';

const Register = () => {

    const [usuario, setUsuario] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) =>
    {
        e.preventDefault();
        setError('');

        console.log("usuario" , usuario)
        console.log("contrasenia" , contrasenia)
        console.log("email" , email)

        if (!usuario || !contrasenia || !email) {
            setError('Todos los campos son obligatorios.');
            return; 
        }

        try 
        {
           const resultado = await crearUsuario(usuario, contrasenia,email);
           if (resultado.error)
           {
            setError(resultado.error);
            console.log("resultado" , resultado)
            console.log("error" , resultado.error)
           } 
           else
           {
            const usuarioConNuevoFlag = {
                usuario: resultado.usuario, 
                email: resultado.email, 
                nuevoUsuario: true,
            };
            localStorage.setItem('usuario', JSON.stringify(usuarioConNuevoFlag));
             navigate('/profile');  
           }
        } catch (error) {
            setError('Error al registrarse. Inténtalo de nuevo.');
        }
    }    

    
  return (
<Paper style={{ padding: '20px', backgroundColor: 'white' , display: 'flex', justifyContent: 'center', alignItems: 'center',}}elevation={24}>
    <div>
    <Typography variant="h4" style={{ color: '#00BFFF', fontWeight: 'bold', textAlign: 'center' }}>
                 Registrarse
        </Typography> 
            <form onSubmit={handleRegister} noValidate>
            <div>
                <br />
                <TextField
                            label="Usuario"
                            variant="outlined"
                            fullWidth
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            required
                            style={{ marginBottom: '2px', backgroundColor: '#E0F7FA' }} 
                        />  
            </div>
            <br />
            <div>  
                 <TextField
                        label="Contraseña"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={contrasenia}
                        onChange={(e) => setContrasenia(e.target.value)}
                        required
                        style={{ marginBottom: '2px', backgroundColor: '#E0F7FA' }}
                    /> 
            </div>
            <br />
            <div>
            <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ marginBottom: '2px', backgroundColor: '#E0F7FA' }}
                    />  
            </div>
            <br />
            {error && <Typography style={{ color: 'red', fontWeight: 'bold' }}>{error}</Typography>}
            <Button type="submit" variant="contained" color="primary" fullWidth>
                    Registrarse
                </Button>
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <Link to="/">Ya tengo cuenta, iniciar sesión</Link>
                </div>
             </form> 
     </div> 
</Paper> 
  )
}

export default Register