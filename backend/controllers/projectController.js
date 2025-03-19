const Project = require('../models/Project');
// Créer un projet
exports.createProject = async (req, res) => {
  try {
    const { name, description, startDate, endDate, budget } = req.body;
    const newProject = new Project({ name:name, description:description, startDate:startDate, endDate:endDate, budget });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Afficher tous les projets
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
