// src/pages/AdicionarFaturaPage.jsx (VERSÃO 100% CSS PURO)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Usando nosso arquivo de CSS puro

const AdicionarFaturaPage = () => {
  const navigate = useNavigate();
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [vencimento, setVencimento] = useState('');
  const [status, setStatus] = useState('A vencer');

  const handleSubmit = (event) => {
    event.preventDefault();
    const novaFatura = {
      id: Date.now(),
      descricao,
      valor: parseFloat(valor),
      vencimento,
      status,
    };
    console.log("Nova fatura criada:", novaFatura);
    alert('Fatura criada com sucesso!');
    navigate('/dashboard');
  };

  return (
    <div className="dashboard-page">
        <header className="dashboard-header">
        <div className="header-content">
        <div className="header-title">
          <h1>Adicionar Nova Fatura</h1>
          </div>
         </div>
</header>
      <main className="dashboard-main" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="dashboard-card" style={{ maxWidth: '600px', width: '100%' }}>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              
              <div className="form-group">
                <label htmlFor="descricao" className="form-label">Descrição</label>
                <input
                  type="text"
                  id="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="form-input"
                  placeholder="Ex: Fatura do Cartão de Crédito"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="valor" className="form-label">Valor (R$)</label>
                <input
                  type="number"
                  id="valor"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  className="form-input"
                  placeholder="150.75"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="vencimento" className="form-label">Data de Vencimento</label>
                <input
                  type="date"
                  id="vencimento"
                  value={vencimento}
                  onChange={(e) => setVencimento(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="status" className="form-label">Status</label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="A vencer">A vencer</option>
                  <option value="Atrasada">Atrasada</option>
                  <option value="Paga">Paga</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="btn btn-secondary" // Reutilizando a classe de botão secundário
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary" // Reutilizando a classe de botão primário
                >
                  Salvar Fatura
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdicionarFaturaPage;