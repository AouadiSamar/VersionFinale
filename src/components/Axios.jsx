import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
  withCredentials: true, // Assurez-vous d'inclure cette ligne pour envoyer les cookies de session
});

AxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  // Ne pas ajouter l'en-tête Authorization si l'URL est celle de la vérification
  if (token && !config.url.includes('/api/v1/users/login/2fa/') && !config.url.includes('/api/v1/users/login/verify/')) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}, error => Promise.reject(error));

export default AxiosInstance;
