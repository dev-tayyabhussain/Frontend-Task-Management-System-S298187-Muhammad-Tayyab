import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-indigo-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">
                    Task Management
                </Link>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="block md:hidden focus:outline-none"
                >
                    {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-4">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="hover:text-indigo-200">
                                Dashboard
                            </Link>
                            <Link to="/tasks" className="hover:text-indigo-200">
                                Tasks
                            </Link>
                            <Link to="/projects" className="hover:text-indigo-200">
                                Projects
                            </Link>
                            <button onClick={handleLogout} className="hover:text-indigo-200">
                                Logout
                            </button>
                            <span className="text-indigo-200">
                                {user.is_staff ? 'Admin' : 'User'}
                            </span>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-indigo-200">
                                Login
                            </Link>
                            <Link to="/register" className="hover:text-indigo-200">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-indigo-700 p-4 mt-2 rounded-lg flex flex-col space-y-3">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="hover:text-indigo-300" onClick={() => setMenuOpen(false)}>
                                Dashboard
                            </Link>
                            <Link to="/tasks" className="hover:text-indigo-300" onClick={() => setMenuOpen(false)}>
                                Tasks
                            </Link>
                            <Link to="/projects" className="hover:text-indigo-300" onClick={() => setMenuOpen(false)}>
                                Projects
                            </Link>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMenuOpen(false);
                                }}
                                className="hover:text-indigo-300"
                            >
                                Logout
                            </button>
                            <span className="text-indigo-300">
                                {user.is_staff ? 'Admin' : 'User'}: {user.username}
                            </span>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-indigo-300" onClick={() => setMenuOpen(false)}>
                                Login
                            </Link>
                            <Link to="/register" className="hover:text-indigo-300" onClick={() => setMenuOpen(false)}>
                                Register
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
