import axios from 'axios';

// ─── Base Axios Instance ─────────────────────────────────────
// All API calls go through this instance. It automatically:
//   1. Targets the Laravel API base URL
//   2. Sends HTTP-only cookies + CSRF tokens (withCredentials)
//   3. Requests JSON responses
//   4. Redirects to /login on 401 Unauthorized

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// ─── Request Interceptor ────────────────────────────────────
// Reads the XSRF-TOKEN cookie (set by /sanctum/csrf-cookie)
// and attaches it as the X-XSRF-TOKEN header on every mutating
// request. Axios does this automatically when withCredentials
// is true and the cookie is present, but this makes it explicit.

api.interceptors.request.use(
  (config) => {
    const xsrfToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];

    if (xsrfToken) {
      config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor ───────────────────────────────────
// Globally handles 401 responses by clearing local auth state
// and redirecting to the login page. Prevents the CSRF-cookie
// preflight request from triggering a redirect loop.

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Don't redirect if the 401 came from the initial CSRF or
      // user-check request (those are expected to 401 when not
      // logged in).
      const url = error.config?.url || '';
      const isAuthCheck =
        url.includes('/sanctum/csrf-cookie') ||
        url.includes('/api/me');

      if (!isAuthCheck) {
        // Clear any persisted auth data
        window.localStorage.removeItem('auth');

        // Redirect to login — using window.location ensures a
        // full navigation even if React Router state is stale.
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  },
);

// ─── CSRF Cookie Helper ─────────────────────────────────────
// Must be called once before login/register to establish the
// XSRF-TOKEN cookie. Sanctum requires this handshake.

export function getCsrfCookie(): Promise<void> {
  return api.get('/sanctum/csrf-cookie').then(() => undefined);
}

export default api;
