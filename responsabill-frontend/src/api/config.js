export const API_BASE_URL = 'http://localhost:5001/api';

export const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

export const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({
            message: 'An error occurred'
        }));
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};

export const createAuthHeader = (token) => ({
    ...headers,
    'Authorization': `Bearer ${token}`
});