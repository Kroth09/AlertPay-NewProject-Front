// Arquivo: pages/Dashboard.jsx (VERSÃO COM LAYOUT CORRIGIDO)
import FaturasAPagar from '../components/dashboard/FaturasAPagar';
import { FaPlus, FaFileInvoiceDollar, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';
import './Dashboard.css';
import FaturasPagas from '../components/dashboard/FaturasPagas';
import CalendarioFaturas from '../components/dashboard/CalendarioFaturas';


function Dashboard({ onLogout }) {

  const handleNovaFatura = () => {
    alert('Funcionalidade de adicionar nova fatura a ser implementada!');
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

      {/* A MUDANÇA PRINCIPAL ACONTECE AQUI NO MAIN */}
      <main className="dashboard-main">
        <div className="dashboard-grid">
          {/* Card 1 com sua classe específica */}
          <section className="dashboard-card card-faturas-a-pagar">
            <div className="card-header">
              <FaFileInvoiceDollar className="card-header-icon icon-blue" />
              <h2>Faturas a Pagar</h2>
            </div>
            <div className="card-body">
              <FaturasAPagar />
            </div>
          </section>

          {/* Card 2 com sua classe específica */}
          <section className="dashboard-card card-faturas-pagas">
            <div className="card-header">
              <FaCheckCircle className="card-header-icon icon-green" />
              <h2>Faturas Pagas</h2>
            </div>
            <div className="card-body">
              <FaturasPagas />
            </div>
          </section>

          {/* Card 3 (Calendário) com sua classe específica */}
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