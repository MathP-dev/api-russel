const jwt = require('jsonwebtoken');
const User = require('../model/User');

const auth = async (req, res, next) => {
  try {
    // Vérifier le token dans les cookies ou dans l'en-tête Authorization
    let token = req.cookies.token;
    if (!token && req.header('Authorization')) {
      token = req.header('Authorization').replace('Bearer ', '');
    }

    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    // Rediriger vers la page de connexion en cas d'erreur d'authentification
    res.redirect('/');
  }
};

module.exports = auth;

