const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  projectId: { type: Number, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  tasksNeeded: [{ type: String }],
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
