import axios from 'axios';

const api = axios.create({
  // In production (Unified), we use relative paths. 
  // In development, we use the VITE_API_URL or localhost.
  baseURL: import.meta.env.PROD ? '/api' : (import.meta.env.VITE_API_URL || 'http://localhost:5000/api'),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor for auth if needed later
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
