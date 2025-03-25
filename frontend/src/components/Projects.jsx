import React, { useState } from 'react';
import axios from 'axios';
function Projects({ onProjectAdded }) {
  const [projects, setProjects] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    id: '',
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
  });

  const handleInputChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    const projectWithId = {
      ...newProject,
      id: Date.now().toString(), // Generate a unique ID
    };
    
    setProjects([...projects, projectWithId]);
    onProjectAdded(projectWithId); 
    setNewProject({
      id: '',
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      budget: '',
    });
    setShowAddForm(false);
    axios.post('http://localhost:5000/api/projects', newProject)
    .then(response => {
      console.log('Projet créé:', response.data);
    })
    .catch(error => {
      console.error('Erreur lors de la création du projet:', error);
    });
    axios.get('http://localhost:5000/api/projects')
    .then(response => {
      console.log('Liste des projets:', response.data);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des projets:', error);
    });
    axios.put(`http://localhost:5000/api/projects/${projectId}`, updatedProject)
    .then(response => {
      console.log('Projet mis à jour:', response.data);
    })
    .catch(error => {
      console.error('Erreur lors de la mise à jour du projet:', error);
    });
    axios.delete(`http://localhost:5000/api/projects/${projectId}`)
    .then(response => {
      console.log('Projet supprimé:', response.data);
    })
    .catch(error => {
      console.error('Erreur lors de la suppression du projet:', error);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6">Projects</h2>
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="px-4 py-2 bg-green-700 text-white rounded-md mb-4 hover:bg-green-400 transition-colors"
      >
        {showAddForm ? 'Cancel' : 'Add Project'}
      </button>

      {showAddForm && (
        <div className="form-container p-6 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Add New Project</h3>
          <form onSubmit={handleAddProject}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newProject.name}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={newProject.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Start Date:
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={newProject.startDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                  End Date:
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={newProject.endDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                Budget:
              </label>
              <input
                type="text"
                id="budget"
                name="budget"
                value={newProject.budget}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Add
            </button>
          </form>
        </div>
      )}

      <ul className="mt-6 space-y-4">
        {projects.map((project) => (
          <li key={project.id} className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold">{project.name}</h3>
            <p className="text-sm text-gray-600">{project.description}</p>
            <p className="text-sm text-gray-500">Start Date: {project.startDate}</p>
            <p className="text-sm text-gray-500">End Date: {project.endDate}</p>
            <p className="text-sm text-gray-500">Budget: {project.budget}</p>
            <button
              onClick={() => onProjectAdded(project)}
              className="mt-3 px-4 py-2 bg-green-700 text-white rounded-md mb-4 hover:bg-green-400 transition-colors"
            >
              Add Tasks
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;