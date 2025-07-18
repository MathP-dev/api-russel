const express = require('express');
const router = express.Router();
const reservationController = require('../controller/reservationController');

// Reservation routes
router.post('/', reservationController.createReservation);
router.get('/', reservationController.getAllReservations);
router.get('/:id', reservationController.getReservationById);
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;
