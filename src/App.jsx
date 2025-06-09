// src/App.jsx
import { useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import StoreContext from './Store/context';
import ProtectedRoute from './components/ProtectedRoutes'; 
import Login from './pages/Login';                     
import Dashboard from './pages/Dashboard';               
import FaturaCadastro from './pages/FaturaCadastro'; // Importe diretamente o arquivo
import Register from './pages/Register';   

function App() {
  const { setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  function handleLogout() {
    setToken(null);
    navigate('/login');
  }

  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />

      {/* Rotas Protegidas aninhadas dentro do ProtectedRoute */}
      <Route element={<ProtectedRoute />}>
        <Route 
          path="/dashboard" 
          element={<Dashboard onLogout={handleLogout} />} 
        />
        {/* Adicione a nova rota para o cadastro de faturas */}
        <Route 
          path="/cadastro-fatura" 
          element={<FaturaCadastro />} 
        />
      </Route>
    </Routes>
  );
}

export default App;