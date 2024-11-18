// api/notifications.js
import { API_BASE_URL, handleResponse } from './config';
import { authAPI } from './auth';


export const notificationsAPI = {
  // Get all notifications
  getAllNotifications: async () => {
      try {
          const response = await fetch(`${API_BASE_URL}/notifications`, {
              headers: {
                  'Authorization': `Bearer ${authAPI.getToken()}`,
              },
          });
          return handleResponse(response);
      } catch (error) {
          throw error;
      }
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
      try {
          const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
              method: 'PUT',
              headers: {
                  'Authorization': `Bearer ${authAPI.getToken()}`,
              },
          });
          return handleResponse(response);
      } catch (error) {
          throw error;
      }
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
      try {
          const response = await fetch(`${API_BASE_URL}/notifications/read-all`, {
              method: 'PUT',
              headers: {
                  'Authorization': `Bearer ${authAPI.getToken()}`,
              },
          });
          return handleResponse(response);
      } catch (error) {
          throw error;
      }
  },

  // Delete notification
  deleteNotification: async (notificationId) => {
      try {
          const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}`, {
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