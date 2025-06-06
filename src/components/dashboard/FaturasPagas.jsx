// Arquivo: src/components/dashboard/FaturasPagas.jsx

import React, { useState } from 'react';
import { FaCheckCircle, FaEllipsisV } from 'react-icons/fa';

// Dados mocados para faturas que já foram pagas
const mockFaturasPagas = [
  {
    id: 5,
    descricao: 'Compra Online - Amazon',
    valor: 189.99,
    pagamento: '2025-05-28',
    status: 'Paga',
  },
  {
    id: 6,
    descricao: 'Aluguel do Mês',
    valor: 1500.00,
    pagamento: '2025-05-05',
    status: 'Paga',
  },
  {
    id: 7,
    descricao: 'Supermercado Semanal',
    valor: 312.45,
    pagamento: '2025-05-22',
    status: 'Paga',
  }
];

function FaturasPagas() {
  const [faturas, _setFaturas] = useState(mockFaturasPagas);

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };
  
  const formatarValor = (valor) => {
    return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  }

  return (
    // Usamos as mesmas classes CSS para manter a consistência
    <div className="faturas-list">
      {faturas.map((fatura) => (
        <div key={fatura.id} className="fatura-item fatura-paga-item">
          
          <div className="fatura-info">
            <p className="fatura-descricao">{fatura.descricao}</p>
            <p className="fatura-vencimento">
              Pago em: {formatarData(fatura.pagamento)}
            </p>
          </div>

          <div className="fatura-details">
            {/* Usamos um novo ícone e classe para o status 'Paga' */}
            <div className="status-paga">
              <FaCheckCircle />
              <span>{fatura.status}</span>
            </div>
            
            <p className="fatura-valor">{formatarValor(fatura.valor)}</p>
            
            <button className="fatura-actions-btn">
              <FaEllipsisV />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FaturasPagas;