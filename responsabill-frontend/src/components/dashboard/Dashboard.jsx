import React, { useState, useEffect } from 'react';
import { logsAPI } from '../../api/recoveryLogs';
import { notificationsAPI } from '../../api/notifications';

const Dashboard = () => {
    const [logs, setLogs] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [logsData, notificationsData] = await Promise.all([
                    logsAPI.getAllLogs(),
                    notificationsAPI.getAllNotifications()
                ]);
                setLogs(logsData);
                setNotifications(notificationsData);
            } catch (err) {
                setError('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold mb-4">Recent Logs</h2>
                    {logs.map(log => (
                        <div key={log._id} className="border-b py-4">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">
                                    {new Date(log.date).toLocaleDateString()}
                                </span>
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                    Mood: {log.mood}
                                </span>
                            </div>
                            <p className="mt-2 text-gray-600">{log.notes}</p>
                        </div>
                    ))}
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold mb-4">Notifications</h2>
                    {notifications.map(notification => (
                        <div
                            key={notification._id}
                            className={`p-4 mb-2 rounded ${
                                notification.read ? 'bg-gray-50' : 'bg-blue-50'
                            }`}
                        >
                            <p>{notification.message}</p>
                            <span className="text-sm text-gray-500">
                                {new Date(notification.createdAt).toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;