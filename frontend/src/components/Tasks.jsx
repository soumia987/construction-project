import React, { useState } from 'react';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    description: '',
    startDate: '',
    endDate: '',
    projectId: '',
    resources: [],
  });

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    setTasks([...tasks, newTask]);
    setNewTask({
      description: '',
      startDate: '',
      endDate: '',
      projectId: '',
      resources: [],
    });
    setShowAddForm(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        {showAddForm ? 'Cancel' : 'Add Task'}
      </button>

      {showAddForm && (
        <div className="mt-4 p-6 border rounded-lg shadow-md bg-white">
          <h3 className="text-xl font-semibold mb-4">Add New Task</h3>
          <form onSubmit={handleAddTask}>
          <div className="mb-4">
              <label htmlFor="projectId" className="block text-sm font-medium text-gray-700">Project ID:</label>
              <input
                type="text"
                id="projectId"
                name="projectId"
                value={newTask.projectId}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
              <textarea
                id="description"
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={newTask.startDate}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date:</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={newTask.endDate}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            
            <div className="mb-4">
              <label htmlFor="projectId" className="block text-sm font-medium text-gray-700">Task Needed:</label>
              <input
                type="text"
                id="TaskNeeded"
                name="Task Needed"
                value={newTask.TaskNeeded}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Add resource selection here (e.g., checkboxes, dropdown) */}
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Add
            </button>
          </form>
        </div>
      )}

      <ul className="mt-4 space-y-4">
        {tasks.map((task, index) => (
          <li key={index} className="p-4 border rounded-lg shadow-md bg-white">
            <strong className="text-lg">{task.description}</strong>
            <p className="text-sm text-gray-600">Start Date: {task.startDate}</p>
            <p className="text-sm text-gray-600">End Date: {task.endDate}</p>
            <p className="text-sm text-gray-600">Project ID: {task.projectId}</p>
            {/* Display resources here */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
