import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

const authClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

let isRefreshing = false;
let failedRequestsQueue = [];

// Request interceptor for API calls
apiClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('authToken');
  const expiresAt = localStorage.getItem('expiresAt');
  const refreshToken = localStorage.getItem('refreshToken');

  if (token) {
    const isExpired = expiresAt ? new Date(expiresAt) < new Date() : true;
    if (isExpired) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const response = await authClient.post('/refresh-token', {
            refresh_token: refreshToken
          });
          const { token: newToken, expires_at: newExpiresAt, refresh_token: newRefreshToken } = response.data;

          localStorage.setItem('authToken', newToken);
          localStorage.setItem('expiresAt', newExpiresAt);
          localStorage.setItem('refreshToken', newRefreshToken);

          failedRequestsQueue.forEach((request) => request.onSuccess(newToken));
          failedRequestsQueue = [];
          isRefreshing = false;
        } catch (error) {
          failedRequestsQueue.forEach((request) => request.onFailure(error));
          failedRequestsQueue = [];
          isRefreshing = false;
          localStorage.removeItem('authToken');
          localStorage.removeItem('expiresAt');
          window.location.href = '/login';
          return Promise.reject(error);
        }
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          onSuccess: (newToken) => {
            config.headers['Authorization'] = `Bearer ${newToken}`;
            resolve(config);
          },
          onFailure: (err) => reject(err),
        });
      });
    } else {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return config;
}, (error) => Promise.reject(error));

export { apiClient, authClient };