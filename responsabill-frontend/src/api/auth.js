// src/api/auth.js
import axiosInstance from './axios';

export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('/api/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};