// Arquivo: pages/Dashboard.jsx (VERSÃO FINAL E CORRIGIDA)

import React, { useState } from 'react';
import FaturasAPagar from '../components/dashboard/FaturasAPagar';
import { FaPlus, FaFileInvoiceDollar, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';
import './Dashboard.css';
import FaturasPagas from '../components/dashboard/FaturasPagas';
import CalendarioFaturas from '../components/dashboard/CalendarioFaturas';
import { useNavigate } from 'react-router';


const mockFaturas = [
  { id: 1, descricao: 'Fatura de Energia - RGE', valor: 245.80, vencimento: '2025-06-02', status: 'Atrasada' },
  { id: 2, descricao: 'Plano de Internet - FibraOnline', valor: 119.90, vencimento: '2025-06-15', status: 'A vencer' },
  { id: 3, descricao: 'Mensalidade da Academia', valor: 89.00, vencimento: '2025-06-20', status: 'A vencer' },
  { id: 4, descricao: 'Assinatura Netflix', valor: 39.90, vencimento: '2025-07-01', status: 'A vencer' },
  { id: 5, descricao: 'Compra Online - Amazon', valor: 189.99, vencimento: '2025-05-28', status: 'Paga' },
  { id: 6, descricao: 'Aluguel do Mês', valor: 1500.00, vencimento: '2025-05-05', status: 'Paga' },
];

function Dashboard({ onLogout }) {
 
    const [todasAsFaturas, setTodasAsFaturas] = useState(mockFaturas);
    const navigate = useNavigate()


  function _marcarComoPaga(faturaId) {
    const faturasAtualizadas = todasAsFaturas.map(fatura => {
      if (fatura.id === faturaId) {
        return { ...fatura, status: 'Paga' };
      }
      return fatura;
    });
    setTodasAsFaturas(faturasAtualizadas);
  }


  const _faturasAPagar = todasAsFaturas.filter(f => f.status !== 'Paga');
  const _faturasPagas = todasAsFaturas.filter(f => f.status === 'Paga');

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-title">
            <h1>AlertPay Dashboard</h1>
          </div>
          <div className="header-actions">
            <button className="btn btn-primary" onClick={() => navigate('/adicionar-fatura')}>
              <FaPlus />
              <span>Nova Fatura</span>
            </button>
            <button className="btn btn-secondary" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-grid">
          
          <section className="dashboard-card card-faturas-a-pagar">
            <div className="card-header">
              <FaFileInvoiceDollar className="card-header-icon icon-blue" />
              <h2>Faturas a Pagar</h2>
            </div>
            <div className="card-body">
              {/* CORREÇÃO AQUI: Passando os dados e a função como props */}
              <FaturasAPagar 
                faturas={_faturasAPagar} 
                onMarcarComoPaga={_marcarComoPaga} 
              />
            </div>
          </section>

          <section className="dashboard-card card-faturas-pagas">
            <div className="card-header">
              <FaCheckCircle className="card-header-icon icon-green" />
              <h2>Faturas Pagas</h2>
            </div>
            <div className="card-body">
              {/* CORREÇÃO AQUI: Passando os dados como props */}
              <FaturasPagas faturas={_faturasPagas} />
            </div>
          </section>
          
          <section className="dashboard-card card-calendario">
            <div className="card-header">
              <FaCalendarAlt className="card-header-icon icon-indigo" />
              <h2>Calendário</h2>
            </div>
            <div className="card-body">
              {/* CORREÇÃO AQUI: Passando os dados como props */}
              <CalendarioFaturas faturas={todasAsFaturas} />
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

export default Dashboard;