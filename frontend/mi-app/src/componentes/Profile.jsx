import React from 'react'
import { Link } from 'react-router-dom';
import { Typography} from '@mui/material';

const Profile = () => {

  const usuario = JSON.parse(localStorage.getItem('usuario'));
  console.log("usuario perfil" , usuario)
  
      return (
        <div>
        <Typography variant="h3" style={{ color: '#333333', fontWeight: 'bold', textAlign: 'center' }}>
                Perfil
        </Typography>
        <br />
        <Typography variant="h5" style={{ color: '#f0f0f0', fontWeight: 'bold', textAlign: 'center' }}>
            {`¡Bienvenido, ${usuario.usuario}!`}
        </Typography> 
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <Link to="/"style={{ color: '#ffffff', marginLeft: '10px' }}>Volver</Link>
        </div>
    </div>
  )
}

export default Profile;