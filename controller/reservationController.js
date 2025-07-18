const Reservation = require('../model/Reservation');

// Create a new reservation
exports.createReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).send(reservation);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all reservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.send(reservations);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a specific reservation by ID
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).send();
    }
    res.send(reservation);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a reservation by ID
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).send();
    }
    res.send(reservation);
  } catch (error) {
    res.status(500).send(error);
  }
};
