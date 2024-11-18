// src/api/communityPosts.js
import { API_BASE_URL, handleResponse } from './config';
import { authAPI } from './auth';

export const postsAPI = {
    getAllPosts: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/community-posts`);
            return handleResponse(response);
        } catch (error) {
            throw error;
        }
    },

  // Create new post
  createPost: async (postData) => {
      try {
          const response = await fetch(`${API_BASE_URL}/community-posts`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${authAPI.getToken()}`,
              },
              body: JSON.stringify(postData),
          });
          return handleResponse(response);
      } catch (error) {
          throw error;
      }
  },

  // Update post
  updatePost: async (postId, updateData) => {
      try {
          const response = await fetch(`${API_BASE_URL}/community-posts/${postId}`, {
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

  // Delete post
  deletePost: async (postId) => {
      try {
          const response = await fetch(`${API_BASE_URL}/community-posts/${postId}`, {
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

  // Add comment to post
  addComment: async (postId, comment) => {
      try {
          const response = await fetch(`${API_BASE_URL}/community-posts/${postId}/comments`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${authAPI.getToken()}`,
              },
              body: JSON.stringify({ content: comment }),
          });
          return handleResponse(response);
      } catch (error) {
          throw error;
      }
  },

  // Like/Unlike post
  toggleLike: async (postId) => {
      try {
          const response = await fetch(`${API_BASE_URL}/community-posts/${postId}/like`, {
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
};