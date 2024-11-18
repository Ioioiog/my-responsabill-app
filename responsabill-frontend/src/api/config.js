// src/api/config.js
export const API_BASE_URL = 'http://localhost:5000/api';

export const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};