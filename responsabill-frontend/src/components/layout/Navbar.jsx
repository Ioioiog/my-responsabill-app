import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../../api/auth';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        authAPI.logout();
        navigate('/login');
    };

    const navLinks = [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/community', label: 'Community' },
        { path: '/recovery-logs', label: 'Recovery Logs' },
        { path: '/notifications', label: 'Notifications' }
    ];

    return (
        <nav className="bg-white shadow">
            <div className="container mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/dashboard" className="text-xl font-bold text-blue-600">
                            ResponsaBill
                        </Link>
                        <div className="hidden md:flex ml-10 space-x-8">
                            {navLinks.map(link => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`${
                                        location.pathname === link.path
                                            ? 'text-blue-600 border-b-2 border-blue-600'
                                            : 'text-gray-500 hover:text-gray-900'
                                    } inline-flex items-center px-1 pt-1 text-sm font-medium`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={handleLogout}
                            className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;