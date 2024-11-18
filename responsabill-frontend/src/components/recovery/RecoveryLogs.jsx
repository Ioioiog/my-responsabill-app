import React, { useState } from 'react';
import { logsAPI } from '../../api/recoveryLogs';

const RecoveryLogs = () => {
    const [newLog, setNewLog] = useState({
        date: new Date().toISOString().split('T')[0],
        mood: 5,
        activities: [],
        notes: ''
    });
    const [error, setError] = useState('');

    const activities = [
        'Exercise', 'Meditation', 'Therapy', 'Reading',
        'Journaling', 'Social Activity', 'Hobby', 'Other'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await logsAPI.createLog(newLog);
            setNewLog({
                date: new Date().toISOString().split('T')[0],
                mood: 5,
                activities: [],
                notes: ''
            });
        } catch (err) {
            setError('Failed to create log');
        }
    };

    const handleActivityToggle = (activity) => {
        setNewLog(prev => ({
            ...prev,
            activities: prev.activities.includes(activity)
                ? prev.activities.filter(a => a !== activity)
                : [...prev.activities, activity]
        }));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6">New Recovery Log</h2>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                            type="date"
                            value={newLog.date}
                            onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Mood (1-10)
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={newLog.mood}
                            onChange={(e) => setNewLog({ ...newLog, mood: Number(e.target.value) })}
                            className="mt-1 block w-full"
                        />
                        <div className="text-center">{newLog.mood}</div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Activities
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {activities.map(activity => (
                                <label
                                    key={activity}
                                    className="flex items-center space-x-2"
                                >
                                    <input
                                        type="checkbox"
                                        checked={newLog.activities.includes(activity)}
                                        onChange={() => handleActivityToggle(activity)}
                                        className="rounded border-gray-300"
                                    />
                                    <span>{activity}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Notes</label>
                        <textarea
                            value={newLog.notes}
                            onChange={(e) => setNewLog({ ...newLog, notes: e.target.value })}
                            rows="4"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Save Log
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RecoveryLogs;