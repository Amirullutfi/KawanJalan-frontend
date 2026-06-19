import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor to inject Sanctum token in Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional helper for image source URLs
export const getMediaUrl = (path) => {
  if (!path) return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'; // fallback
  if (path.startsWith('http')) return path;
  
  const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://127.0.0.1:8000';
  return `${serverUrl}/${path}`;
};

// Caching helper to automatically store backend data and fall back on failure
export const fetchWithCache = async (url, fallbackData = null) => {
  const cacheKey = `cached_${url.replace(/[^a-zA-Z0-9]/g, '_')}`;
  try {
    const response = await api.get(url);
    localStorage.setItem(cacheKey, JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.warn(`API error on ${url}. Using local storage fallback.`, error);
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (parseErr) {
        console.error(`Error parsing cached data for ${cacheKey}:`, parseErr);
      }
    }
    return fallbackData;
  }
};

export default api;
