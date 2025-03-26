import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Projects({ onProjectAdded }) {
  const [projects, setProjects] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Validation schema for the form
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Project name is required')
      .min(3, 'Project name must be at least 3 characters'),
    description: Yup.string().max(500, 'Description must be less than 500 characters'),
    startDate: Yup.date().required('Start date is required').nullable(),
    endDate: Yup.date()
      .min(Yup.ref('startDate'), 'End date cannot be before start date')
      .required('End date is required')
      .nullable(),
    budget: Yup.number()
      .required('Budget is required')
      .positive('Budget must be a positive number')
      .integer('Budget must be an integer'),
  });

  const handleAddProject = (values, { setSubmitting, resetForm }) => {
    const projectWithId = {
      ...values,
      id: Date.now().toString(), 
    };

    setProjects([...projects, projectWithId]);  
    onProjectAdded(projectWithId);  
    resetForm();
    setShowAddForm(false);

    axios.post('http://localhost:5000/api/projects', values)
      .then(response => {
        console.log('Project created:', response.data);
      })
      .catch(error => {
        console.error('Error creating project:', error);
      });

    axios.get('http://localhost:5000/api/projects')
      .then(response => {
        console.log('Projects list:', response.data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  };

  const handleEditProject = (values, { setSubmitting, resetForm }) => {
    const updatedProject = {
      ...values,
      id: editingProject.id, // Keep the same ID
    };

    const updatedProjects = projects.map(project =>
      project.id === editingProject.id ? updatedProject : project
    );
    setProjects(updatedProjects);
    setShowEditForm(false);

    axios.put(`http://localhost:5000/api/projects/${editingProject.id}`, values)
      .then(response => {
        console.log('Project updated:', response.data);
      })
      .catch(error => {
        console.error('Error updating project:', error);
      });

    resetForm();
  };

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(project => project.id !== projectId));

    axios.delete(`http://localhost:5000/api/projects/${projectId}`)
      .then(response => {
        console.log('Project deleted:', response.data);
      })
      .catch(error => {
        console.error('Error deleting project:', error);
      });
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);

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
          <Formik
            initialValues={{
              name: '',
              description: '',
              startDate: '',
              endDate: '',
              budget: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleAddProject}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name:
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description:
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                      Start Date:
                    </label>
                    <Field
                      type="date"
                      id="startDate"
                      name="startDate"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                      End Date:
                    </label>
                    <Field
                      type="date"
                      id="endDate"
                      name="endDate"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name="endDate" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                    Budget:
                  </label>
                  <Field
                    type="number"
                    id="budget"
                    name="budget"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="budget" component="div" className="text-red-500 text-sm" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  {isSubmitting ? 'Adding...' : 'Add Project'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}

      {/* Display projects as cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold">{project.name}</h3>
            <p className="text-sm text-gray-600">{project.description}</p>
            <p className="text-sm text-gray-500">Start Date: {project.startDate}</p>
            <p className="text-sm text-gray-500">End Date: {project.endDate}</p>
            <p className="text-sm text-gray-500">Budget: {project.budget}DH</p>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => {
                  setEditingProject(project);
                  setShowEditForm(true);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400"
              >
                Update
              </button>

              <button
                onClick={() => handleDeleteProject(project.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showEditForm && editingProject && (
        <div className="form-container p-6 bg-gray-100 rounded-lg shadow-md mt-6">
          <h3 className="text-xl font-semibold mb-4">Edit Project</h3>
          <Formik
            initialValues={editingProject}
            validationSchema={validationSchema}
            onSubmit={handleEditProject}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name:
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description:
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                      Start Date:
                    </label>
                    <Field
                      type="date"
                      id="startDate"
                      name="startDate"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                      End Date:
                    </label>
                    <Field
                      type="date"
                      id="endDate"
                      name="endDate"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name="endDate" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                    Budget:
                  </label>
                  <Field
                    type="number"
                    id="budget"
                    name="budget"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="budget" component="div" className="text-red-500 text-sm" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  {isSubmitting ? 'Updating...' : 'Update Project'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}

export default Projects;
