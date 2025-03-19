const express = require('express');
const router = express.Router();
const { addResource, getResources } = require('../controllers/ressourceController.js');

router.post('/resources', addResource);
router.get('/resources', getResources);

module.exports = router;
