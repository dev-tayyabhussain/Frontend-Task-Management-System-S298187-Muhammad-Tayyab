import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalTasks: 0,
        completedTasks: 0,
        inProgressTasks: 0,
        projects: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const tasksResponse = await api.get('/api/tasks/');
                const projectsResponse = await api.get('/api/projects/');

                const tasks = tasksResponse.data;
                const projects = projectsResponse.data;

                setStats({
                    totalTasks: tasks.length,
                    completedTasks: tasks.filter(task => task.status === 'Completed').length,
                    inProgressTasks: tasks.filter(task => task.status === 'In Progress').length,
                    projects: projects.length,
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, [stats]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700">Total Tasks</h3>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">{stats.totalTasks}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700">Completed Tasks</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">{stats.completedTasks}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700">In Progress Tasks</h3>
                    <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.inProgressTasks}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700">Projects</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{stats.projects}</p>
                </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Welcome, {user.username}!</h3>
                <p className="text-gray-600">
                    You are logged in as {user.is_staff ? 'an administrator' : 'a standard user'}.
                    {user.is_staff
                        ? ' You have full access to create, read, update, and delete all tasks and projects.'
                        : ' You can view all tasks and projects, and create new ones.'}
                </p>
            </div>
        </div>
    );
};

export default Dashboard;