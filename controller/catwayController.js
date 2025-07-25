const Catway = require('../model/Catway');
const { handleResponse, handleError } = require('../utils/controllerUtils');

// Create a new catway
exports.createCatway = async (req, res) => {
   try {
    const catway = new Catway(req.body);
    await catway.save();
    handleResponse(res, req, catway, '/catways', 201);
   } catch (error) {
    handleError(res, req, error, 'Erreur lors de la création du catway');
   }
};

// Get all catways
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific catway by ID
exports.getCatwayById = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) {
      return res.status(404).json({ error: 'Catway not found' });
    }
    res.json(catway);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a catway by ID
exports.updateCatway = async (req, res) => {
  try {
    const catway = await Catway.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!catway) {
      return res.status(404).json({ error: 'Catway not found' });
    }
    res.json(catway);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a catway by ID
exports.deleteCatway = async (req, res) => {
  try {
    const catway = await Catway.findByIdAndDelete(req.params.id);
    if (!catway) {
      return res.status(404).json({ error: 'Catway not found' });
    }
    res.json({ message: 'Catway deleted successfully', catway });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};