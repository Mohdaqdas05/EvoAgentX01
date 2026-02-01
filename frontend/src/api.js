import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

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

// Auth endpoints
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/update', data),
};

// Menu endpoints
export const menuAPI = {
  getAllItems: (params) => api.get('/menu', { params }),
  getItem: (id) => api.get(`/menu/${id}`),
  getChefRecommendations: () => api.get('/menu/recommendations'),
  createItem: (data) => api.post('/menu', data),
  updateItem: (id, data) => api.put(`/menu/${id}`, data),
  deleteItem: (id) => api.delete(`/menu/${id}`),
};

// Reservation endpoints
export const reservationAPI = {
  getAllReservations: (params) => api.get('/reservations', { params }),
  getReservation: (id) => api.get(`/reservations/${id}`),
  createReservation: (data) => api.post('/reservations', data),
  updateReservation: (id, data) => api.put(`/reservations/${id}`, data),
  cancelReservation: (id) => api.put(`/reservations/${id}/cancel`, {}),
  deleteReservation: (id) => api.delete(`/reservations/${id}`),
};

// Order endpoints
export const orderAPI = {
  getAllOrders: (params) => api.get('/orders', { params }),
  getOrder: (id) => api.get(`/orders/${id}`),
  getUserOrders: () => api.get('/orders/user/my'),
  createOrder: (data) => api.post('/orders', data),
  processPayment: (id, data) => api.post(`/orders/${id}/payment`, data),
  updateOrder: (id, data) => api.put(`/orders/${id}`, data),
  deleteOrder: (id) => api.delete(`/orders/${id}`),
};

// Settings endpoints
export const settingsAPI = {
  getSettings: () => api.get('/restaurant'),
  updateSettings: (data) => api.put('/restaurant', data),
  createContact: (data) => api.post('/contact', data),
  getContacts: (params) => api.get('/contact', { params }),
  updateContact: (id, data) => api.put(`/contact/${id}`, data),
};

export default api;
