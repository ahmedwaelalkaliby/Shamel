import axios from 'axios';
import { getAuthToken } from './cookies';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://souqshamel.com/api',
  headers: {

    'Accept': 'application/json',
    'Accept-Language': 'ar',
  },
});

// Request interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    
    if (error.response?.status === 401) {
      // Unauthorized - token might be expired
      // handleLogout will be called from hooks or middleware
    }
    
    return Promise.reject({
      ...error,
      message
    });
  }
);


export default axiosInstance;
