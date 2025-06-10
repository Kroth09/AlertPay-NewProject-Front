import React from 'react';
import { FaCheckCircle, FaEllipsisV } from 'react-icons/fa';

function FaturasPagas({ faturas }) {

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  const formatarValor = (valor) => {
    return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  }

  return (
    <div className="faturas-list">
      {faturas.length === 0 && (
        <p className="nenhuma-fatura-msg">Nenhuma fatura paga encontrada.</p>
      )}

      {faturas.map((fatura) => (
        <div key={fatura.id} className="fatura-item fatura-paga-item">

          <div className="fatura-info">
            <p className="fatura-descricao">{fatura.descricao}</p>
            {/* << MODIFICAÇÃO AQUI: REMOVIDA A LINHA DA DATA DE PAGAMENTO >> */}
            {/* <p className="fatura-vencimento">
              Pago em: {fatura.pagamento ? formatarData(fatura.pagamento) : 'Data Indisponível'}
            </p> */}
          </div>

          <div className="fatura-details">
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
