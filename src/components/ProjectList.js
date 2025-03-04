import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newProjectName, setNewProjectName] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/projects/');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProject = async () => {
        if (!newProjectName.trim()) return;
        try {
            const response = await api.post('/api/projects/', { name: newProjectName });
            setProjects([...projects, response.data]);
            setNewProjectName('');
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!user.is_staff) return;
        try {
            await api.delete(`/api/projects/${id}/`);
            setProjects(projects.filter(project => project.id !== id));
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    if (loading) {
        return <div className="container mx-auto px-4 py-8 text-center">Loading projects...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Projects</h2>
                {user.is_staff ? (
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            value={newProjectName}
                            onChange={(e) => setNewProjectName(e.target.value)}
                            placeholder="Enter project name"
                            className="px-4 py-2 border rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            onClick={handleAddProject}
                            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full sm:w-auto"
                        >
                            Add Project
                        </button>
                    </div>
                ) : (
                    <p className="text-red-500 font-semibold">Only admin can add projects.</p>
                )}

            </div>

            {projects.length === 0 ? (
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <p className="text-gray-600">No projects found. Create your first project!</p>
                </div>
            ) : (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-indigo-800 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2 font-mono text-white text-center">
                                {project.name}
                            </h3>

                            {user.is_staff && (
                                <div className="mt-4 flex justify-center">
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectList;
