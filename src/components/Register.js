import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import api from '../services/api';

const Register = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (userData.password !== userData.password2) {
            setError('Passwords do not match');
            return;
        }

        try {
            await api.post('/api/register/', {
                username: userData.username,
                email: userData.email,
                password: userData.password
            });
            navigate('/login');
        } catch (error) {
            setError('Registration failed');
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center">
                    <FaUserPlus size={50} className="mx-auto text-indigo-600" />
                    <h2 className="mt-4 text-2xl font-bold text-gray-900">
                        Create a New Account
                    </h2>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-700 text-sm text-center py-2 px-4 mt-4 rounded-md">
                        {error}
                    </div>
                )}

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <input
                            type="text"
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                            placeholder="Username"
                            value={userData.username}
                            onChange={(e) =>
                                setUserData({ ...userData, username: e.target.value })
                            }
                        />

                        <input
                            type="email"
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                            placeholder="Email"
                            value={userData.email}
                            onChange={(e) =>
                                setUserData({ ...userData, email: e.target.value })
                            }
                        />

                        <input
                            type="password"
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                            placeholder="Password"
                            value={userData.password}
                            onChange={(e) =>
                                setUserData({ ...userData, password: e.target.value })
                            }
                        />

                        <input
                            type="password"
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                            placeholder="Confirm Password"
                            value={userData.password2}
                            onChange={(e) =>
                                setUserData({ ...userData, password2: e.target.value })
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition-all"
                    >
                        Register
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-indigo-600 font-semibold hover:underline">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
