import React, { useState, useEffect } from 'react';
import { notificationsAPI } from '../../api/notifications';

const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const data = await notificationsAPI.getAllNotifications();
            setNotifications(data);
        } catch (err) {
            setError('Failed to fetch notifications');
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await notificationsAPI.markAsRead(id);
            setNotifications(notifications.map(notif =>
                notif._id === id ? { ...notif, read: true } : notif
            ));
        } catch (err) {
            setError('Failed to mark notification as read');
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await notificationsAPI.markAllAsRead();
            setNotifications(notifications.map(notif => ({ ...notif, read: true })));
        } catch (err) {
            setError('Failed to mark all notifications as read');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Notifications</h2>
                <button
                    onClick={handleMarkAllAsRead}
                    className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
                >
                    Mark all as read
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                {notifications.map(notification => (
                    <div
                        key={notification._id}
                        className={`p-4 rounded-lg shadow ${
                            notification.read ? 'bg-white' : 'bg-blue-50'
                        }`}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-900">{notification.message}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {new Date(notification.createdAt).toLocaleString()}
                                </p>
                            </div>
                            {!notification.read && (
                                <button
                                    onClick={() => handleMarkAsRead(notification._id)}
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                    Mark as read
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationList;