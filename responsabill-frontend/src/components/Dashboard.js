import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Notification from './Notification';
import Analytics from './Analytics';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await axios.get('/api/notifications', {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      // Handle notifications
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h1>Welcome back, {user.username}!</h1>
      <Notification />
      <Analytics />
    </div>
  );
};

export default Dashboard;
