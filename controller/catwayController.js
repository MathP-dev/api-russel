const Catway = require('../model/Catway');

// Create a new catway
exports.createCatway = async (req, res) => {
   try {
    const catway = new Catway(req.body);
    await catway.save();
    res.status(201).json(catway);
   } catch (error) {
    res.status(400).send(error);
   }
};

// Get all catways
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.send(catways);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a specific catway by ID
exports.getCatwayById = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) {
      return res.status(404).send();
    }
    res.send(catway);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a catway by ID
exports.updateCatway = async (req, res) => {
  try {
    const catway = await Catway.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!catway) {
      return res.status(404).send();
    }
    res.send(catway);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a catway by ID
exports.deleteCatway = async (req, res) => {
  try {
    const catway = await Catway.findByIdAndDelete(req.params.id);
    if (!catway) {
      return res.status(404).send();
    }
    res.send(catway);
  } catch (error) {
    res.status(500).send(error);
  }
};