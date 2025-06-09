// src/pages/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FaturasAPagar from '../components/dashboard/FaturasAPagar';
import { FaPlus, FaFileInvoiceDollar, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';
import './Dashboard.css';
import FaturasPagas from '../components/dashboard/FaturasPagas';
import CalendarioFaturas from '../components/dashboard/CalendarioFaturas';


function Dashboard({ onLogout }) {
  const navigate = useNavigate();

  const handleNovaFatura = () => {
    navigate('/cadastro-fatura'); // Redireciona para a rota de cadastro
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-title">
            <h1>AlertPay Dashboard</h1>
          </div>
          <div className="header-actions">
            <button className="btn btn-primary" onClick={handleNovaFatura}>
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
              <FaturasAPagar />
            </div>
          </section>

          <section className="dashboard-card card-faturas-pagas">
            <div className="card-header">
              <FaCheckCircle className="card-header-icon icon-green" />
              <h2>Faturas Pagas</h2>
            </div>
            <div className="card-body">
              <FaturasPagas />
            </div>
          </section>

          <section className="dashboard-card card-calendario">
            <div className="card-header">
              <FaCalendarAlt className="card-header-icon icon-indigo" />
              <h2>Calendário</h2>
            </div>
            <div className="card-body">
              <CalendarioFaturas />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;