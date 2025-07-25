const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Catway = require('../model/Catway');
const Reservation = require('../model/Reservation');
const mongoose = require('mongoose');

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

// Route pour créer un nouveau catway (web)
router.post('/catways', auth, async (req, res) => {
  try {
    const catway = new Catway(req.body);
    await catway.save();
    res.redirect('/catways');
  } catch (error) {
    console.error('Error creating catway:', error);
    res.status(400).render('error', { 
      message: 'Erreur lors de la création du catway',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

// Route pour la liste des réservations
router.get('/reservations', auth, async (req, res) => {
  const reservations = await Reservation.find();
  res.render('reservations', { reservations, isAuthenticated: true });
});

// Route pour créer une nouvelle réservation (web)
router.post('/reservations', auth, async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.redirect('/reservations');
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(400).render('error', { 
      message: 'Erreur lors de la création de la réservation',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

// Route pour les détails d'un catway
router.get('/catways/:id', auth, async (req, res) => {
  try {
    // Valider que l'ID est un ObjectId valide
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).render('error', { 
        message: 'ID de catway invalide',
        error: process.env.NODE_ENV === 'development' ? new Error('Invalid ObjectId') : {}
      });
    }
    
    const catway = await Catway.findById(req.params.id);
    if (!catway) {
      return res.status(404).render('error', { 
        message: 'Catway non trouvé',
        error: process.env.NODE_ENV === 'development' ? new Error('Catway not found') : {}
      });
    }
    res.render('catway', { catway, isAuthenticated: true });
  } catch (error) {
    console.error('Error finding catway:', error);
    res.status(400).render('error', { 
      message: 'Erreur lors de la recherche du catway',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

// Route pour supprimer un catway (web)
router.delete('/catways/:id', auth, async (req, res) => {
  try {
    // Valider que l'ID est un ObjectId valide
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).render('error', { 
        message: 'ID de catway invalide',
        error: process.env.NODE_ENV === 'development' ? new Error('Invalid ObjectId') : {}
      });
    }
    
    const catway = await Catway.findByIdAndDelete(req.params.id);
    if (!catway) {
      return res.status(404).render('error', { 
        message: 'Catway non trouvé',
        error: process.env.NODE_ENV === 'development' ? new Error('Catway not found') : {}
      });
    }
    res.redirect('/catways');
  } catch (error) {
    console.error('Error deleting catway:', error);
    res.status(400).render('error', { 
      message: 'Erreur lors de la suppression du catway',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

// Route pour les détails d'une réservation
router.get('/reservations/:id', auth, async (req, res) => {
  try {
    // Valider que l'ID est un ObjectId valide
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).render('error', { 
        message: 'ID de réservation invalide',
        error: process.env.NODE_ENV === 'development' ? new Error('Invalid ObjectId') : {}
      });
    }
    
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).render('error', { 
        message: 'Réservation non trouvée',
        error: process.env.NODE_ENV === 'development' ? new Error('Reservation not found') : {}
      });
    }
    res.render('reservation', { reservation, isAuthenticated: true });
  } catch (error) {
    console.error('Error finding reservation:', error);
    res.status(400).render('error', { 
      message: 'Erreur lors de la recherche de la réservation',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

// Route pour supprimer une réservation (web)
router.delete('/reservations/:id', auth, async (req, res) => {
  try {
    // Valider que l'ID est un ObjectId valide
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).render('error', { 
        message: 'ID de réservation invalide',
        error: process.env.NODE_ENV === 'development' ? new Error('Invalid ObjectId') : {}
      });
    }
    
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).render('error', { 
        message: 'Réservation non trouvée',
        error: process.env.NODE_ENV === 'development' ? new Error('Reservation not found') : {}
      });
    }
    res.redirect('/reservations');
  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(400).render('error', { 
      message: 'Erreur lors de la suppression de la réservation',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

// Route pour la documentation
router.get('/documentation', (req, res) => {
  res.render('documentation');
});

module.exports = router;

