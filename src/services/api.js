import axios from 'axios';

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

// Expense APIs
export const expenseAPI = {
  getExpenses: () => api.get('/expenses'),
  addExpense: (data) => api.post('/expenses', data),
  clearExpenses: () => api.delete('/expenses'),
  updateExpense: (id, data) => api.put(`/expenses/${id}`, data),
  deleteExpense: (id) => api.delete(`/expenses/${id}`),
};

// Income APIs
export const incomeAPI = {
  getIncome: () => api.get('/income'),
  addIncome: (data) => api.post('/income', data),
  updateIncome: (id, data) => api.put(`/income/${id}`, data),
  deleteIncome: (id) => api.delete(`/income/${id}`),
};

// Wallet APIs
export const walletAPI = {
  getWallet: () => api.get('/wallet'),
  setWallet: (data) => api.post('/wallet', data),
  getWallets: () => api.get('/wallet/all'),
};

export default api;
