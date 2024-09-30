
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componentes/Login';
import Register from './componentes/Register';
import UpdatePassword from './componentes/UpdatePassword';
import InvoicesList from './componentes/InvoicesList';
import Profile from './componentes/Profile'; 

function App() { 
  return (
    <Router> 
      <div div className="app-container">
      <Routes> 
        <Route path="/" element={<Login />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/update-password/:idUsuario" element={<UpdatePassword />} />
          <Route path="/invoices/:idUsuario" element={<InvoicesList />} />
          <Route path="/profile" element={<Profile />} />
      </Routes> 
      </div>      
    </Router>
  );
}

export default App
