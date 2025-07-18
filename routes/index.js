const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Catway = require('../model/Catway');
const Reservation = require('../model/Reservation');

// Route pour la page d'accueil
router.get('/', (req, res) => {
  // Vérifier si l'utilisateur est connecté via le cookie
  let isAuthenticated = false;
  if (req.cookies.token) {
    try {
      const jwt = require('jsonwebtoken');
      jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      isAuthenticated = true;
    } catch (error) {
      isAuthenticated = false;
    }
  }
  res.render('index', { isAuthenticated });
});

// Route pour le tableau de bord
router.get('/dashboard', auth, (req, res) => {
  res.render('dashboard', { isAuthenticated: true });
});

// Route pour la liste des catways
router.get('/catways', auth, async (req, res) => {
  const catways = await Catway.find();
  res.render('catways', { catways, isAuthenticated: true });
});

// Route pour la liste des réservations
router.get('/reservations', auth, async (req, res) => {
  const reservations = await Reservation.find();
  res.render('reservations', { reservations, isAuthenticated: true });
});

// Route pour les détails d'un catway
router.get('/catways/:id', auth, async (req, res) => {
  const catway = await Catway.findById(req.params.id);
  res.render('catway', { catway, isAuthenticated: true });
});

// Route pour les détails d'une réservation
router.get('/reservations/:id', auth, async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  res.render('reservation', { reservation, isAuthenticated: true });
});

// Route pour la documentation
router.get('/documentation', (req, res) => {
  res.render('documentation');
});

module.exports = router;

