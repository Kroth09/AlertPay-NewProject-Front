import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Register = () => {
  // ... (toda a sua lógica de state e handleSubmit permanece igual) ...
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    console.log("Enviando dados de registro para a API:", { name, email, password });
    alert('Conta criada com sucesso! Você será redirecionado para o login.');
    navigate('/login');
  };


  return (
    // Adicione este wrapper para centralizar o conteúdo
    <div className='login-page-wrapper'> 
      {/* Altere a classe aqui de 'container' para 'login-container' */}
      <div className='login-container'> 
        <form onSubmit={handleSubmit}>
          <h1>Crie sua Conta</h1>
          {/* O resto do seu formulário permanece exatamente igual */}
          <div className='input-field'>
            <input 
              type="text" 
              placeholder='Nome completo'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <FaUser className='icon'/>
          </div>
          <div className='input-field'>
            <input 
              type="email" 
              placeholder='E-mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaEnvelope className='icon'/>
          </div>
          <div className='input-field'>
            <input 
              type="password" 
              placeholder='Senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            /> 
            <FaLock className='icon'/>
          </div>
          <div className='input-field'>
            <input 
              type="password" 
              placeholder='Confirme sua senha'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            /> 
            <FaLock className='icon'/>
          </div>
          
          <button type="submit">Registrar</button>

          <div className="signup-link">
            <p>Já tem uma conta? <Link to="/login">Faça Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;