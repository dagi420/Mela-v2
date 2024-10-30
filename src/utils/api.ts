import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const register = (userData: any) => api.post('/auth/register', userData);
export const login = (credentials: any) => api.post('/auth/login', credentials);

// Expenses endpoints
export const fetchExpenses = () => api.get('/expenses');
export const addExpense = (data: any) => api.post('/expenses', data);
export const updateExpense = (id: string, data: any) => api.put(`/expenses/${id}`, data);
export const deleteExpense = (id: string) => api.delete(`/expenses/${id}`);

// Income endpoints
export const fetchIncomes = () => api.get('/income');
export const addIncome = (data: any) => api.post('/income', data);
export const updateIncome = (id: string, data: any) => api.put(`/income/${id}`, data);
export const deleteIncome = (id: string) => api.delete(`/income/${id}`);

// Investment endpoints
export const fetchInvestments = () => api.get('/investments');
export const addInvestment = (data: any) => api.post('/investments', data);
export const updateInvestment = (id: string, data: any) => api.put(`/investments/${id}`, data);
export const deleteInvestment = (id: string) => api.delete(`/investments/${id}`);

// Goals endpoints
export const fetchGoals = () => api.get('/goals');
export const addGoal = (data: any) => api.post('/goals', data);
export const updateGoal = (id: string, data: any) => api.put(`/goals/${id}`, data);
export const deleteGoal = (id: string) => api.delete(`/goals/${id}`);

export default api;