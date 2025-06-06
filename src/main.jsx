import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import StoreProvider from './Store/storeprovider.jsx'; // Corrigi para o nome da pasta que você mencionou
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <App /> {/* Renderiza APENAS o componente App */}
      </BrowserRouter>
    </StoreProvider>
  </StrictMode>,
);






















{/*import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import StoreProvider from './Store/storeprovider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
    </StoreProvider>
  </StrictMode>,
) */}
