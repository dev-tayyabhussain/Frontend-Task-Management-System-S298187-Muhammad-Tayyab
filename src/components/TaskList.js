import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/tasks/');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!user.is_staff) return;
        try {
            await api.delete(`/api/tasks/${id}/`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'High': return 'text-red-500';
            case 'Medium': return 'text-yellow-400';
            case 'Low': return 'text-green-500';
            default: return '';
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Completed': return 'text-green-400';
            case 'In Progress': return 'text-yellow-400';
            case 'Pending': return 'text-gray-400';
            default: return '';
        }
    };

    if (loading) {
        return <div className="container mx-auto px-4 py-8 text-center">Loading tasks...</div>;
    }

    return (
        <div className="container mx-auto px-2 sm:px-4 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-center sm:text-left">Tasks</h2>
                <Link
                    to="/task/new"
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 mt-2 sm:mt-0 w-full sm:w-auto text-center"
                >
                    Add New Task
                </Link>
            </div>

            {tasks.length === 0 ? (
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <p className="text-gray-600">No tasks found. Create your first task!</p>
                </div>
            ) : (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {tasks.map((task) => (
                        <div key={task.id} className="bg-indigo-800 p-4 rounded-lg shadow">
                            <div className="flex flex-col sm:flex-row justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Name: <span className="text-yellow-200">{task.title}</span></h3>
                                    <p className="text-white mt-1">Description: <span className="text-yellow-200">{task.description}</span></p>
                                </div>
                                <h2 className={`mt-2 sm:mt-0 text-sm px-2 py-1 rounded-full ${getStatusClass(task.status)}`}>
                                    {task.status}
                                </h2>
                            </div>

                            <div className="mt-4 flex flex-col sm:flex-row justify-between">
                                <div>
                                    <p className="text-white">Priority: <span className={getPriorityClass(task.priority)}>{task.priority}</span></p>
                                    <p className="text-white">Due: {new Date(task.due_date).toLocaleDateString()}</p>
                                </div>

                                {user.is_staff && (
                                    <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-2">
                                        <Link
                                            to={`/task/edit/${task.id}`}
                                            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded px-4 py-2 text-center w-full sm:w-auto"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(task.id)}
                                            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded px-4 py-2 text-center w-full sm:w-auto"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
