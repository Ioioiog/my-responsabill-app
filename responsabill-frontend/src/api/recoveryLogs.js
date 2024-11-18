// api/recoveryLogs.js

import { API_BASE_URL, handleResponse } from './config';
import { authAPI } from './auth';

export const logsAPI = {
  // Get all logs
  getAllLogs: async () => {
      try {
          const response = await fetch(`${API_BASE_URL}/recovery-logs`, {
              headers: {
                  'Authorization': `Bearer ${authAPI.getToken()}`,
              },
          });
          return handleResponse(response);
      } catch (error) {
          throw error;
      }
  },

  // Get specific log
  getLog: async (logId) => {
      try {
          const response = await fetch(`${API_BASE_URL}/recovery-logs/${logId}`, {
              headers: {
                  'Authorization': `Bearer ${authAPI.getToken()}`,
              },
          });
          return handleResponse(response);
      } catch (error) {
          throw error;
      }
  },

  // Create new log
  createLog: async (logData) => {
      try {
          const response = await fetch(`${API_BASE_URL}/recovery-logs`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${authAPI.getToken()}`,
              },
              body: JSON.stringify(logData),
          });
          return handleResponse(response);
      } catch (error) {
          throw error;
      }
  },

  // Update log
  updateLog: async (logId, updateData) => {
      try {
          const response = await fetch(`${API_BASE_URL}/recovery-logs/${logId}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${authAPI.getToken()}`,
              },
              body: JSON.stringify(updateData),
          });
          return handleResponse(response);
      } catch (error) {
          throw error;
      }
  },

  // Delete log
  deleteLog: async (logId) => {
      try {
          const response = await fetch(`${API_BASE_URL}/recovery-logs/${logId}`, {
              method: 'DELETE',
              headers: {
                  'Authorization': `Bearer ${authAPI.getToken()}`,
              },
          });
          return handleResponse(response);
      } catch (error) {
          throw error;
      }
  },
};