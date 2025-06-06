// Arquivo: src/components/dashboard/FaturasAPagar.jsx (VERSÃO COM CSS PURO)

import React, { useState } from 'react';
import { FaExclamationCircle, FaEllipsisV } from 'react-icons/fa';

// Os dados mocados continuam os mesmos
const mockFaturas = [
  { id: 1, descricao: 'Fatura de Energia - RGE', valor: 245.80, vencimento: '2025-06-02', status: 'Atrasada' },
  { id: 2, descricao: 'Plano de Internet - FibraOnline', valor: 119.90, vencimento: '2025-06-15', status: 'A vencer' },
  { id: 3, descricao: 'Mensalidade da Academia', valor: 89.00, vencimento: '2025-06-20', status: 'A vencer' },
  { id: 4, descricao: 'Assinatura Netflix', valor: 39.90, vencimento: '2025-07-01', status: 'A vencer' }
];

function FaturasAPagar() {
  const [faturas, _setFaturas] = useState(mockFaturas);

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };
  
  const formatarValor = (valor) => {
    return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  }

  return (
    <div className="faturas-list">
      {faturas.map((fatura) => (
        <div key={fatura.id} className="fatura-item">
          
          <div className="fatura-info">
            <p className="fatura-descricao">{fatura.descricao}</p>
            <p className="fatura-vencimento">
              Vencimento: {formatarData(fatura.vencimento)}
            </p>
          </div>

          <div className="fatura-details">
            {fatura.status === 'Atrasada' && (
              <div className="fatura-status status-atrasada">
                <FaExclamationCircle />
                <span>{fatura.status}</span>
              </div>
            )}
            
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

export default FaturasAPagar;