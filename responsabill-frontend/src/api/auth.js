// src/api/auth.js
import { API_BASE_URL, handleResponse } from './config';

export const authAPI = {
    getToken: () => localStorage.getItem('token'),
    setToken: (token) => localStorage.setItem('token', token),
    removeToken: () => localStorage.removeItem('token'),

    register: async (userData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const data = await handleResponse(response);
            authAPI.setToken(data.token);
            return data;
        } catch (error) {
            throw error;
        }
    },

    login: async (credentials) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            const data = await handleResponse(response);
            authAPI.setToken(data.token);
            return data;
        } catch (error) {
            throw error;
        }
    },

    logout: () => {
        authAPI.removeToken();
    }
};