import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Token to Requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication Services
const AuthService = {
  userLogin: (data) => api.post('/users/login', data),//✅
  userRegister: (data) => api.post('/users/register', data),//✅
  userLogout: () => api.post('/users/logout'),//✅
  ownerLogin: (data) => api.post('/owners/login', data),//✅
  ownerRegister: (data) => api.post('/owners/register', data),//✅
  ownerLogout: () => api.post('/owners/logout'),//✅
};

// Accommodation Services
const AccommodationService = {
  getAll: () => api.get('/accommodation'),//✅
  filter: (data) => api.post('/filter-accommodation', data),//✅
  ownerView: () => api.get('/owners/accommodation'),//✅
  ownerCreate: (data) => api.post('/owners/accommodation', data),//✅
  ownerUpdate: (id, data) => api.put(`/owners/accommodation/${id}`, data),//✅
  ownerDelete: (id) => api.delete(`/owners/accommodation/${id}`),//✅
};

// Booking Services
const BookingService = {
  getAll: () => api.get('/booking'),//✅
  create: (data) => api.post('/booking', data),//✅
  update: (id, data) => api.put(`/booking/${id}`, data),//✅
  // delete: (id) => api.delete(`/booking/${id}`),//✅
  ownerView: () => api.get('/owners/booking'),//✅
  ownerUpdate: (id, data) => api.put(`/owners/booking/${id}`, data),//✅
};

// Payment Services
const PaymentService = {
  getAll: () => api.get('/payment'),//⛔
  create: (data) => api.post('/payment', data),//✅
};

// Review Services
const ReviewService = {
  getAll: () => api.get('/review'),//✅
  create: (data) => api.post('/review', data),//⛔
  update: (id, data) => api.put(`/review/${id}`, data),//⛔
  delete: (id) => api.delete(`/review/${id}`),//⛔
};

//User-Scheduled Visits Services
const ScheduledVisitService = {
  getAll: () => api.get('/scheduletovisit'),//✅
  create: (data) => api.post('/scheduletovisit', data),//⛔
  update: (id, data) => api.put(`/scheduletovisit/${id}`, data),//✅
  delete: (id) => api.delete(`/scheduletovisit/${id}`),//✅
};

// Owner-Specific Scheduled Visits
const OwnerScheduledVisitService = {
  getAll: () => api.get('/owners/scheduledvisit'),//✅
  update: (id, data) => api.put(`/owners/scheduledvisit/${id}`, data),//✅
};

// Service Management
const ServiceService = {
  getAll: () => api.get('/owners/services'),//✅
  create: (data) => api.post('/owners/services', data),//✅
  get: (id) => api.get(`/owners/services/${id}`),//✅
  update: (id, data) => api.put(`/owners/services/${id}`, data),//⛔
  delete: (id) => api.delete(`/owners/services/${id}`),//⛔
};

// Sharing Rents
const SharingRentService = {
  getAll: () => api.get('/owners/sharingrents'),//✅
  create: (data) => api.post('/owners/sharingrents', data),//✅
  get: (id) => api.get(`/owners/sharingrents/${id}`),//✅
  update: (id, data) => api.put(`/owners/sharingrents/${id}`, data),//⛔
  delete: (id) => api.delete(`/owners/sharingrents/${id}`),//⛔
};

// Analytics
const AnalyticsService = {
  getOwnerAnalytics: () => api.get('/owners/analytics'),//⛔
};

export {
  AuthService,
  AccommodationService,
  BookingService,
  PaymentService,
  ReviewService,
  ScheduledVisitService,
  OwnerScheduledVisitService,
  ServiceService,
  SharingRentService,
  AnalyticsService,
};
