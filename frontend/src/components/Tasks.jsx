import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Resources from './Resources';
import axios from 'axios';

function Tasks({ project, onBack }) {
  const [tasks, setTasks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const validationSchema = Yup.object({
    description: Yup.string()
      .required('Description is required')
      .min(5, 'Description must be at least 5 characters'),
    startDate: Yup.date()
      .required('Start date is required')
      .nullable(),
    endDate: Yup.date()
      .required('End date is required')
      .min(Yup.ref('startDate'), 'End date cannot be before start date')
      .nullable(),
    taskNeeded: Yup.string()
      .required('Task Needed is required')
      .min(3, 'Task Needed must be at least 3 characters'),
  });

  const handleAddTask = (values, { setSubmitting, resetForm }) => {
    const taskWithId = {
      ...values,
      id: Date.now().toString(),
      projectId: project.id,
    };

    setTasks([...tasks, taskWithId]);
    setSelectedTask(taskWithId);
    resetForm();
    setShowAddForm(false);

    // API call to create task
    axios.post('http://localhost:5000/api/tasks', taskWithId)
      .then(response => {
        console.log('Task created:', response.data);
      })
      .catch(error => {
        console.error('Error creating task:', error);
      });
  };

  if (selectedTask) {
    return <Resources taskId={selectedTask.id} onBack={() => setSelectedTask(null)} />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={onBack}
            className="text-blue-500 hover:text-blue-600 mb-2"
          >
            ← Back to Projects
          </button>
          <h2 className="text-2xl font-semibold">Tasks for {project.name}</h2>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          {showAddForm ? 'Cancel' : 'Add Task'}
        </button>
      </div>

      {showAddForm && (
        <div className="mt-4 p-6 border rounded-lg shadow-md bg-white">
          <h3 className="text-xl font-semibold mb-4">Add New Task</h3>
          <Formik
            initialValues={{
              description: '',
              startDate: '',
              endDate: '',
              taskNeeded: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleAddTask}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-4">
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date:</label>
                  <Field
                    type="date"
                    id="startDate"
                    name="startDate"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-4">
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date:</label>
                  <Field
                    type="date"
                    id="endDate"
                    name="endDate"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage name="endDate" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-4">
                  <label htmlFor="taskNeeded" className="block text-sm font-medium text-gray-700">Task Needed:</label>
                  <Field
                    type="text"
                    id="taskNeeded"
                    name="taskNeeded"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage name="taskNeeded" component="div" className="text-red-500 text-sm" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  {isSubmitting ? 'Adding Task...' : 'Add Task'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}

      <ul className="mt-4 space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="p-4 border rounded-lg shadow-md bg-white">
            <div className="flex justify-between items-start">
              <div>
                <strong className="text-lg">{task.description}</strong>
                <p className="text-sm text-gray-600">Start Date: {task.startDate}</p>
                <p className="text-sm text-gray-600">End Date: {task.endDate}</p>
                <p className="text-sm text-gray-600">Task Needed: {task.taskNeeded}</p>
              </div>
              <button
                onClick={() => setSelectedTask(task)}
                className="bg-green-700 text-white rounded-md mb-4 hover:bg-green-400 transition"
              >
                Add Resources
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
