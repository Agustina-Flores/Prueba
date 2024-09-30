import React from 'react'
import { useState } from 'react'
import { realizarLogin } from '../api/api'; 
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Paper,Typography,TextField,Button  } from '@mui/material';

const Login = () => {
   
    const [usuario, setUsuario] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
 
    const handleUpdatePasswordClick = async (e) => {
        e.preventDefault(); 

        if (!usuario || !contrasenia) {
            console.log("campos vacios " , error)
            setError('Los campos usuario y contraseña son obligatorios.'); 
            return; 
        }
        const resultado = await realizarLogin(usuario, contrasenia);
        if (resultado.error)
        {
         setError(resultado.error);
         console.log("error" , resultado.error)
        } 
        else
        {  
         localStorage.setItem('usuario', JSON.stringify(resultado.usuario));
         console.log("resultado" , resultado.usuario)
         console.log("idUsuario", resultado.usuario.idUsuario);
         if (resultado.usuario.idUsuario) {
            navigate(`/update-password/${resultado.usuario.idUsuario}`);
        } else {
            console.error("idUsuario no está definido");
        }
        }
        
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // Previene comportamiento por defecto del formulario (que es recargar la página)
        setError('');

        console.log("usuario" , usuario)
        console.log("contrasenia" , contrasenia)

        if (!usuario || !contrasenia) {
            console.log("campos vacios " , error)
            setError('Los campos usuario y contraseña son obligatorios.');
            return; 
        }
        try
        {
           const resultado = await realizarLogin(usuario, contrasenia);
           if (resultado.error)
           {
            setError(resultado.error);
            console.log("error" , resultado.error)
           } 
           else
           {  
            localStorage.setItem('usuario', JSON.stringify(resultado.usuario));
            console.log("resultado" , resultado.usuario)
            navigate(`/invoices/${resultado.usuario.idUsuario}`);
            console.log("resultado exitoso" , resultado)
           }
        } catch (error) {
            setError('Error al iniciar sesión. Inténtalo de nuevo.');
             console.error(error);
        }
          
    };
    
 
  return (
<Paper style={{ padding: '20px', backgroundColor: 'white' , display: 'flex', justifyContent: 'center', alignItems: 'center',}}elevation={24}>

    <div>
        <Typography variant="h4" style={{ color: '#00BFFF', fontWeight: 'bold', textAlign: 'center' }}>
                Iniciar sesión
        </Typography>
        <form onSubmit={handleLogin} noValidate>
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
            {error && <Typography style={{ color: 'red', fontWeight: 'bold' }}>{error}</Typography>}
            <Button type="submit" variant="contained" color="primary" fullWidth>
                    Iniciar Sesión
                </Button>
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <a href="/register" style={{ color: '#00BFFF' }}>Registrarse</a>
            <Link to="#" onClick={handleUpdatePasswordClick} style={{ color: '#00BFFF', marginLeft: '10px' }}>Actualizar clave</Link>
        </div>
        </form>
    </div> 
</Paper>
  )
}

export default Login