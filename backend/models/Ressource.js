const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  type: { type: String, required: true },
  quantity: { type: Number, required: true },
  fournisseur: { type: String, required: true },
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
