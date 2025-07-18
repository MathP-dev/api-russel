const express = require('express');
const router = express.Router();
const catwayController = require('../controller/catwayController');

// Catway routes
router.post('/', catwayController.createCatway);
router.get('/', catwayController.getAllCatways);
router.get('/:id', catwayController.getCatwayById);
router.put('/:id', catwayController.updateCatway);
router.delete('/:id', catwayController.deleteCatway);

module.exports = router;
