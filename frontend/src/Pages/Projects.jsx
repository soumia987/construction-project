import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Projects() {
  // State to store the list of projects
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API when the component is mounted
  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(response => {
        setProjects(response.data); // Store projects in state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(err => {
        setError('There was an error fetching the projects');
        setLoading(false); // Set loading to false even on error
      });
  }, []);

  // Render the loading state, error message, or the list of projects
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Projects List</h1>
      
      {loading && <p>Loading projects...</p>}  {/* Show loading text */}
      {error && <p className="text-red-500">{error}</p>}  {/* Show error message */}
      
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project._id} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">{project.name}</h2>
              <p className="text-gray-700 mb-2"><strong>Description:</strong> {project.description}</p>
              <p className="text-gray-700 mb-2"><strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}</p>
              <p className="text-gray-700 mb-2"><strong>End Date:</strong> {new Date(project.endDate).toLocaleDateString()}</p>
              <p className="text-gray-700 mb-2"><strong>Budget:</strong> ${project.budget}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;
