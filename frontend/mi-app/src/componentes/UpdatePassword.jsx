import React from 'react'
import { useState } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom';
import { actualizarUsuario } from '../api/api';
import { Paper,Typography,TextField,Button  } from '@mui/material';

const UpdatePassword = () => {

    const { idUsuario } = useParams(); 
    const [usuario, setUsuario] = useState('');
    const [contraseniaActual , setContraseniaActual] = useState('');
    const [nuevaContrasenia, setNuevaContrasenia] = useState('');
    const [confirmarContrasenia, setConfirmarContrasenia] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e)  =>
    {
        e.preventDefault();
        setError('');
        setSuccess('');

        console.log('ID Usuario:', idUsuario);
        console.log('Usuario:', usuario);
        console.log('Nueva Contraseña:', nuevaContrasenia);

        if (!usuario || !contraseniaActual || !nuevaContrasenia || !confirmarContrasenia) {
            setError('Todos los campos son obligatorios.');
            return;
        }
        if (nuevaContrasenia !== confirmarContrasenia) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        try {
            const resultado = await actualizarUsuario(idUsuario, usuario, nuevaContrasenia);
            console.log("resultado " , resultado)
            if (resultado.error) {
                console.log("resultado" , resultado)
                setError(resultado.error);
            } else {
                console.log("resultado" , resultado)
                console.log('Actualizando contraseña para:', { usuario, nuevaContrasenia });
                setSuccess('Contraseña actualizada con éxito.');
                
                setTimeout(() => navigate('/'), 2000);
            }
        } catch (err) {
            setError('Error al actualizar la contraseña. Inténtalo de nuevo.');
            console.error(err);
        }
 
    }
    return (
        <Paper style={{ padding: '20px', backgroundColor: 'white' , display: 'flex', justifyContent: 'center', alignItems: 'center',}}elevation={24}>
        <div>
        <Typography variant="h4" style={{ color: '#00BFFF', fontWeight: 'bold', textAlign: 'center' }}>
        Cambiar contraseña
        </Typography>  
            <form onSubmit={handleSubmit} noValidate>
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
                <div>
                <br />
                <TextField
                        label="Contraseña Actual"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={contraseniaActual}
                        onChange={(e) => setContraseniaActual(e.target.value)}
                        required
                        style={{ marginBottom: '2px', backgroundColor: '#E0F7FA' }}
                    /> 
                </div>
                <div>
                    <br />
                    <TextField
                        label="Nueva Contraseña "
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={nuevaContrasenia}
                        onChange={(e) => setNuevaContrasenia(e.target.value)}
                        required
                        style={{ marginBottom: '2px', backgroundColor: '#E0F7FA' }}
                    /> 
                </div>
                <div>
                <br />
                    <TextField
                            label="Confirmar Contraseña "
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={confirmarContrasenia}
                            onChange={(e) => setConfirmarContrasenia(e.target.value)}
                            required
                            style={{ marginBottom: '2px', backgroundColor: '#E0F7FA' }}
                        />  
                </div>
                <br />
                {error && <Typography style={{ color: 'red', fontWeight: 'bold' }}>{error}</Typography>}
                {success && <Typography style={{ color: 'green', fontWeight: 'bold' }}>{success}</Typography>}
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                    Actualizar Contraseña
                    </Button>
                    <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <Link to="/" style={{ color: '#00BFFF', marginLeft: '10px' }}>Volver</Link>
            </div>
            </form> 
         </div>
        </Paper> 
  )
}

export default UpdatePassword;