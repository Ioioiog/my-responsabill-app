import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CommunityPosts from './components/community/CommunityPosts';
import RecoveryLogs from './components/recovery/RecoveryLogs';
import NotificationList from './components/notifications/NotificationList';
import { authAPI } from './api/auth';

const PrivateRoute = ({ children }) => {
    const token = authAPI.getToken();
    return token ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Dashboard />
                            </Layout>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Dashboard />
                            </Layout>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/community"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <CommunityPosts />
                            </Layout>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/recovery-logs"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <RecoveryLogs />
                            </Layout>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/notifications"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <NotificationList />
                            </Layout>
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </Router>
    );
};

export default App;