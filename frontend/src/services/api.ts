import axios from 'axios';

// ─── Base Axios Instance ─────────────────────────────────────
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// ─── Request Interceptor ────────────────────────────────────
// Injects Bearer Token from localStorage into the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor ───────────────────────────────────
// Globally handles 401 responses by clearing local token and redirecting
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('auth');

      const url = error.config?.url || '';
      const isAuthEndpoint =
        url.includes('/api/login') ||
        url.includes('/api/register');

      if (!isAuthEndpoint) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

export default api;
