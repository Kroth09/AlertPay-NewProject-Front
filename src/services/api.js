// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Confirme se esta é a URL da sua API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;