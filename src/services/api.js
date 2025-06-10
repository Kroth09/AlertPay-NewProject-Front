// src/services/api.js
import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:4000',
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('authToken');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const loginUser = async (credentials) => {
	const response = await api.post('/login', credentials);
	return response.data;
};

export const registerUser = async (userData) => {
	const response = await api.post('/users', userData);
	return response.data;
};

export const getInvoices = async (bankId) => {
	const params = bankId ? { bankId } : {};
	const response = await api.get('/invoices', { params });
	return response.data;
};

export const addInvoice = async (invoiceData) => {
	const response = await api.post('/invoices', invoiceData);
	return response.data;
};

export const updateInvoice = async (id, updateData) => {
	const response = await api.put(`/invoices/${id}`, updateData);
	return response.data;
};

export const deleteInvoice = async (id) => {
	const response = await api.delete(`/invoices/${id}`);
	return response.data;
};

export const getManualInvoices = async () => {
	const response = await api.get('/invoices/manual');
	return response.data;
};

export const bankLogin = async (loginData) => {
	const response = await api.post('/bank-login', loginData);
	return response.data;
};
