const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./model/User');
require('dotenv').config({ path: './env/.env' });

const seedUser = async () => {
  try {
    // Connexion à la base de données
    await mongoose.connect(process.env.URI_MONGO);
    console.log('Connecté à la base de données');

    // Création d'un nouvel utilisateur (le mot de passe sera automatiquement haché par le middleware pre('save'))
    const user = new User({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin',
    });

    // Sauvegarde de l'utilisateur dans la base de données
    await user.save();
    console.log('Utilisateur ajouté avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
  } finally {
    // Déconnexion de la base de données
    mongoose.disconnect();
    console.log('Déconnecté de la base de données');
  }
};

seedUser();
