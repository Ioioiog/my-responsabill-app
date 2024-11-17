import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await axios.get('/api/notifications', {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      setNotifications(response.data);
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h2>Your Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification._id}>
            {notification.message} - {notification.read ? 'Read' : 'Unread'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
