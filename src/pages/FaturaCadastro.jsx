// src/pages/FaturaCadastro.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import faturasService from '../services/faturasService'; // O caminho mudou um pouco
import styles from './FaturaCadastro.module.css'; // Importa os estilos agora do arquivo FaturaCadastro.module.css
import { FaArrowLeft } from 'react-icons/fa';

function FaturaCadastro() {
  const navigate = useNavigate();

  const [fatura, setFatura] = useState({
    descricao: '',
    valor: '',
    vencimento: '',
    status: 'A vencer',
  });

  const [mensagem, setMensagem] = useState(null);
  const [tipoMensagem, setTipoMensagem] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFatura((prevFatura) => ({
      ...prevFatura,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMensagem(null);
    setIsLoading(true);

    if (!fatura.descricao || !fatura.valor || !fatura.vencimento) {
      setMensagem('Por favor, preencha todos os campos obrigatórios.');
      setTipoMensagem('erro');
      setIsLoading(false);
      return;
    }

    const faturaParaEnviar = {
      ...fatura,
      valor: parseFloat(fatura.valor),
    };

    try {
      const response = await faturasService.createFatura(faturaParaEnviar);
      setMensagem('Fatura cadastrada com sucesso!');
      setTipoMensagem('sucesso');
      setFatura({
        descricao: '',
        valor: '',
        vencimento: '',
        status: 'A vencer',
      });
      console.log('Fatura cadastrada:', response);

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      setMensagem('Erro ao cadastrar fatura. Verifique os dados e tente novamente.');
      setTipoMensagem('erro');
      console.error('Detalhes do erro ao cadastrar fatura:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <button className={styles.backButton} onClick={() => navigate('/dashboard')}>
            <FaArrowLeft />
            <span>Voltar ao Dashboard</span>
          </button>
          <h1 className={styles.title}>Cadastro de Nova Fatura</h1>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.formCard}>
          {mensagem && (
            <div className={`${styles.mensagem} ${styles[tipoMensagem]}`}>
              {mensagem}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="descricao">Descrição:</label>
              <input
                type="text"
                id="descricao"
                name="descricao"
                value={fatura.descricao}
                onChange={handleChange}
                placeholder="Ex: Aluguel, Conta de Luz, Salário"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="valor">Valor:</label>
              <input
                type="number"
                id="valor"
                name="valor"
                value={fatura.valor}
                onChange={handleChange}
                step="0.01"
                placeholder="Ex: 1500.50"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="vencimento">Vencimento:</label>
              <input
                type="date"
                id="vencimento"
                name="vencimento"
                value={fatura.vencimento}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="status">Status:</label>
              <select
                id="status"
                name="status"
                value={fatura.status}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="A vencer">A vencer</option>
                <option value="Atrasada">Atrasada</option>
                <option value="Paga">Paga</option>
              </select>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Cadastrando...' : 'Cadastrar Fatura'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default FaturaCadastro;