const Resource = require('../models/Ressource');

// Ajouter une ressource
exports.addResource = async (req, res) => {
  try {
    const { type, quantity, supplier } = req.body;
    const newResource = new Resource({  type:type, quantity:quantity, supplier:supplier });
    await newResource.save();
    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Afficher toutes les ressources
exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
