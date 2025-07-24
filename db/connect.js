const mongoose = require('mongoose');

// Charger le bon fichier .env selon l'environnement
if (process.env.NODE_ENV !== 'production') {
  const envFile = process.env.NODE_ENV === 'test' ? './env/.env.test' : './env/.env';
  require('dotenv').config({path: envFile});
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI_MONGO);
    console.log('MongoDB connecté...');
    console.log('Base de données utilisée:', process.env.URI_MONGO.split('/')[3].split('?')[0]);
  } catch (err) {
    console.error('Erreur de connexion à MongoDB :', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
