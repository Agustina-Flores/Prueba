import React from 'react'
import { useState , useEffect} from 'react'
import { obtenerFacturas } from '../api/api';
import { useParams ,Link,useNavigate} from 'react-router-dom';
import { Typography,TextField,TableContainer ,Paper,Table,TableHead,TableRow,TableCell,TableBody,Button} from '@mui/material';

const InvoicesList = () => {
    const { idUsuario } = useParams(); 
    const [facturas, setFacturas] = useState([]);
    const [filteredFacturas, setFilteredFacturas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [dateSearch, setDateSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFacturas = async () => {
            console.log("idUsuario", idUsuario);
            if (!idUsuario) {
                setError('ID de usuario no encontrado.');
                setLoading(false);
                return;
            }
            try {
                const data = await obtenerFacturas(idUsuario); 
                console.log(" data", data);
                setFacturas(data);
                setFilteredFacturas(data);
            } catch (error) {
                const errorMessage = error.response ? await error.response.text() : error.message;
                setError('No se pudieron cargar las facturas.');
                setTimeout(() => navigate('/'), 2000); 
                console.error('Error al obtener facturas:', errorMessage);
            } finally {
                setLoading(false);
            }
        }; 
        fetchFacturas();
    }, [idUsuario]);
  
    const handleSearchByDate = () => {
        console.log("Fecha de búsqueda:", dateSearch);
        console.log("Facturas:", facturas.map(factura => factura.fecha));
     
        if (!dateSearch) {
            setFilteredFacturas(facturas); 
            return;
        }
             //Crea un objeto Date a partir de la fecha de la factura. 
            const results = facturas.filter(factura => {
            const facturaDate = new Date(factura.fecha);
            const searchDate = new Date(dateSearch);
     
            // Ajusta la hora de facturaDate en tiempo UTC. Esto asegura que la comparación solo se base en la fecha
            facturaDate.setUTCHours(0, 0, 0, 0);
            searchDate.setUTCHours(0, 0, 0, 0);
    
            console.log("Fecha factura:", facturaDate.toISOString(), "Fecha búsqueda:", searchDate.toISOString());

            return facturaDate.getTime() === searchDate.getTime();
        });
    
        console.log("Resultados de búsqueda por fecha:", results);
        setFilteredFacturas(results);
    };
    useEffect(() => {
        setFilteredFacturas(facturas);
    }, [facturas]);


    if (loading) return <p>Cargando facturas...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;


  return (
    <div>
        <Typography variant="h4" style={{ color: '#333333', fontWeight: 'bold', textAlign: 'center' }}>
             Lista de Facturas
        </Typography> 
        <br /> 
        <TextField
            variant="outlined"
            type="date" 
            value={dateSearch}
            onChange={e => setDateSearch(e.target.value)} 
            fullWidth
            style={{ marginBottom: '20px' }}
        />
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button variant="contained" color="primary" onClick={handleSearchByDate}>
                    Buscar por Fecha
                </Button>
            </div> 
            <br />
             <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, bgcolor: '#555555', color: '#ffffff' }} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: '#ffffff' }}><strong>Cliente</strong></TableCell>
                            <TableCell style={{ color: '#ffffff' }}><strong>Total</strong></TableCell>
                            <TableCell style={{ color: '#ffffff' }}><strong>Fecha</strong></TableCell>
                        </TableRow>    
                    </TableHead>
                    <TableBody>
                    {filteredFacturas.map(factura => (
                        <TableRow key={factura.idFactura}>
                            <TableCell style={{ color: '#ffffff' }}>{factura.cliente}</TableCell> 
                            <TableCell style={{ color: '#ffffff' }}>{factura.total}</TableCell>
                            <TableCell style={{ color: '#ffffff' }}>{new Date(factura.fecha).toLocaleDateString()}</TableCell> 
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
             </TableContainer>
             <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <Link to="/"style={{ color: '#ffffff', marginLeft: '10px' }}>Volver</Link>
            </div>
    </div>
  )
}

export default InvoicesList