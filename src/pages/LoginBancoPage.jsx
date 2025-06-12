// src/pages/LoginBancoPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUniversity, FaLandmark, FaBuilding, FaCity,
  FaEnvelope, FaLock, FaArrowLeft, FaTachometerAlt,
  FaEye, FaEyeSlash, FaTrashAlt
} from 'react-icons/fa';
import './Dashboard.css';
import { bankLogin } from '../services/api';

const banks = [
  { name: 'Banco Kroth', id: 'APImini-bc', icon: FaLandmark, colorClass: 'icon-orange' },
  { name: 'Banco Kaiser', id: 'banco-central', icon: FaBuilding, colorClass: 'icon-red' },
  { name: 'Banco Biancon', id: 'bank-account-api', icon: FaCity, colorClass: 'icon-blue' },
  { name: 'Banco Lima', id: 'mini-banco-central', icon: FaUniversity, colorClass: 'icon-purple' },
];

const LoginBancoPage = () => {
  const navigate = useNavigate();
  const [selectedBankId, setSelectedBankId] = useState(null);
  const [selectedBankName, setSelectedBankName] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para exibir erros
  const [successMessage, setSuccessMessage] = useState(''); // NOVO ESTADO: Para mensagens de sucesso
  const [showPassword, setShowPassword] = useState(false);

    const [connectedBanks, setConnectedBanks] = useState([
    { name: 'Banco Kroth', icon: FaLandmark, colorClass: 'icon-orange' },
    { name: 'Banco Lima', icon: FaUniversity, colorClass: 'icon-purple' },
  ]);

     const handleRemoveBank = (bankNameToRemove) => {
    // Filtra a lista, mantendo apenas os bancos cujo nome é DIFERENTE do que queremos remover
    setConnectedBanks(prevConnected => 
      prevConnected.filter(bank => bank.name !== bankNameToRemove)
    );
    alert(`${bankNameToRemove} foi desconectado com sucesso!`);
  };

  const handleBankSelect = (bank) => {
    setSelectedBankId(bank.id); // Armazena o ID
    setSelectedBankName(bank.name); // Armazena o nome para exibição
    setError(''); // Limpa qualquer erro anterior
    setSuccessMessage(''); // << NOVO >> Limpa mensagens de sucesso anteriores
  };

  const handleBackToSelection = () => {
    setSelectedBankId(null);
    setSelectedBankName(null);
    setEmail('');
    setPassword('');
    setError('');
    setSuccessMessage(''); // << NOVO >> Limpa mensagens ao voltar
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Limpa erros anteriores
    setSuccessMessage(''); // << NOVO >> Limpa mensagens de sucesso anteriores

    const loginData = {
      email,
      password,
      bankId: selectedBankId, // Usar o ID do banco
    };

    console.log("Enviando dados de login do banco para a API:", loginData);

    try {
      const response = await bankLogin(loginData);
      console.log("Resposta do login do banco:", response);

      if (response && response.bankToken) {
        setSuccessMessage(`Login no ${selectedBankName} realizado com sucesso! Redirecionando...`);

        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        setError(response.message || "Erro desconhecido ao conectar com o banco. Resposta inesperada.");
      }
    } catch (err) {
      console.error("Erro ao fazer login no banco:", err);
      if (err.response) {
        setError(err.response.data.message || "Credenciais inválidas ou erro no servidor do banco.");
      } else if (err.request) {
        setError("Não foi possível conectar ao servidor do banco. Verifique a URL e CORS.");
      } else {
        setError("Ocorreu um erro inesperado ao tentar conectar com o banco.");
      }
    }
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-title">
            <h1>Gerenciamento de Bancos</h1>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
              <FaTachometerAlt />
              <span>Voltar ao Dashboard</span>
            </button>
          </div>
        </div>
      </header>
      <main className="dashboard-main" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="dashboard-card" style={{ maxWidth: '700px', width: '100%' }}>
          <div className="card-body">

            {!selectedBankId ? (
              <div>
                <h2 className="form-title">Selecione uma instituição para Conectar</h2>
                <div className="bank-selection-grid">
                  {banks.map((bank) => (
                    <button key={bank.id} className="bank-card" onClick={() => handleBankSelect(bank)}>
                      <bank.icon className={`bank-card-icon ${bank.colorClass}`} />
                      <span className="bank-card-name">{bank.name}</span>
                    </button>
                  ))}
                </div>
                 <div className="connected-banks-section">
                  <h3 className="connected-banks-title">Bancos Já Conectados</h3>
                  {connectedBanks.length > 0 ? (
                    <ul className="connected-bank-list">
                      {connectedBanks.map((bank) => (
                        <li key={bank.name} className="connected-bank-item">
                          <div className="connected-bank-info">
                            <bank.icon className={`bank-icon-small ${bank.colorClass}`} />
                            <span>{bank.name}</span>
                          </div>
                          <button onClick={() => handleRemoveBank(bank.name)} className="remove-bank-btn">
                            <FaTrashAlt />
                            <span>Remover</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="nenhuma-conexao-msg">Nenhum banco conectado no momento.</p>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div className="selected-bank-header">
                  <button onClick={handleBackToSelection} className="back-button">
                    <FaArrowLeft />
                  </button>
                  <FaUniversity className="bank-icon" />
                  <h2 className="form-title">Login - {selectedBankName}</h2>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">E-mail</label>
                    <div className="input-with-icon">
                      <FaEnvelope />
                      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="password" className="form-label">Senha</label>
                    <div className="input-with-icon">
                      <FaLock />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-input"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="password-toggle-btn"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  {/* << NOVO: Exibir mensagem de sucesso >> */}
                  {successMessage && <p className="success-message" style={{ color: 'lightgreen', textAlign: 'center', marginBottom: '10px' }}>{successMessage}</p>}
                  {/* << Manter a exibição de erro, se houver >> */}
                  {error && <p className="error-message" style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</p>}

                  <div className="form-actions">
                    <button type="button" onClick={() => navigate('/dashboard')} className="btn btn-secondary">Cancelar</button>
                    <button type="submit" className="btn btn-primary">Conectar</button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginBancoPage;
