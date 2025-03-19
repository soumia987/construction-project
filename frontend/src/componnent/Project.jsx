import React, { useState } from "react";

function Project() {
  const [tasks, setTasks] = useState(["projet1", "projet2","projet3"]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask(""); 
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      const [movedTask] = updatedTasks.splice(index, 1);
      updatedTasks.splice(index - 1, 0, movedTask);
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      const [movedTask] = updatedTasks.splice(index, 1);
      updatedTasks.splice(index + 1, 0, movedTask);
      setTasks(updatedTasks);
    }
  }

  return (
    <div className="to-do-list max-w-lg mx-auto p-4 mt-16">
      <h1 className="text-4xl text-center mb-6">Xpert construction</h1>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Enter a new project ..."
          value={newTask}
          onChange={handleInputChange}
          className="px-4 py-2 border rounded-lg text-xl w-full mr-2"
        />
        <button
          className="add-button bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          onClick={addTask}
        >
          Add 
        </button>
      </div>
      <ol className="list-decimal space-y-4">
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between items-center">
            <span className="text-xl">{task}</span>
            <div className="space-x-2">
              <button
                className="move-button bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                onClick={() => moveTaskUp(index)}
              >
                Up ↑
              </button>
              <button
                className="move-button bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                onClick={() => moveTaskDown(index)}
              >
                Down ↓
              </button>
              <button
                className="delete-button bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Project;
