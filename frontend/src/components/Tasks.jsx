import React, { useState } from 'react';
import Resources from './Resources';

function Tasks({ project, onBack }) {
  const [tasks, setTasks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTask, setNewTask] = useState({
    id: '',
    description: '',
    startDate: '',
    endDate: '',
    taskNeeded: '',
  });

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const taskWithId = {
      ...newTask,
      id: Date.now().toString(),
      projectId: project.id,
    };
    setTasks([...tasks, taskWithId]);
    setSelectedTask(taskWithId);
    setNewTask({
      id: '',
      description: '',
      startDate: '',
      endDate: '',
      taskNeeded: '',
    });
    setShowAddForm(false);
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
          <form onSubmit={handleAddTask}>
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
              <label htmlFor="taskNeeded" className="block text-sm font-medium text-gray-700">Task Needed:</label>
              <input
                type="text"
                id="taskNeeded"
                name="taskNeeded"
                value={newTask.taskNeeded}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Add Task
            </button>
          </form>
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
                className=" bg-green-700 text-white rounded-md mb-4 hover:bg-green-400 transition"
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