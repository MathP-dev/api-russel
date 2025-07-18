const mongoose = require('mongoose');
require('dotenv').config({path: './env/.env'});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI_MONGO);
    console.log('MongoDB connecté...');
  } catch (err) {
    console.error('Erreur de connexion à MongoDB :', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
