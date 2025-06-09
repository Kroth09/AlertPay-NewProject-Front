// src/services/faturasService.js
import api from './api'; // Importa a instância do Axios que configuramos

const faturasService = {
  /**
   * Envia os dados de uma nova fatura para o endpoint de cadastro da API.
   * @param {object} faturaData - Objeto contendo os dados da fatura (descricao, valor, vencimento, status).
   * @returns {Promise<object>} - Uma promessa que resolve com a resposta da API (geralmente a fatura criada).
   * @throws {Error} - Lança um erro se a requisição falhar (por exemplo, erro de rede, erro do servidor).
   */
  createFatura: async (faturaData) => {
    try {
      // api.post('/faturas', faturaData) fará uma requisição POST para 'baseURL/faturas'
      const response = await api.post('/faturas', faturaData);
      return response.data; // Retorna os dados que a API enviar de volta
    } catch (error) {
      // Loga o erro para ajudar na depuração.
      // error.response contém detalhes da resposta do servidor (status, data, headers).
      console.error('Erro ao cadastrar fatura:', error.response ? error.response.data : error.message);
      // Rejoga o erro para que o componente que chamou esta função possa lidar com ele (exibir mensagem ao usuário).
      throw error;
    }
  },

  // Futuramente, você pode adicionar outras funções aqui, como:
  // getTodasFaturas: async () => {
  //   const response = await api.get('/faturas');
  //   return response.data;
  // },
  // marcarFaturaComoPaga: async (id) => {
  //   const response = await api.put(`/faturas/${id}/pagar`);
  //   return response.data;
  // }
};

export default faturasService;