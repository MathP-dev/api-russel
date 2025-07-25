const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const port = process.env.PORT || 8888;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catwayRoutes = require('./routes/catways');
const reservationRoutes = require('./routes/reservations');
const connectDB = require('./db/connect');
const { specs, swaggerUi } = require('./config/swagger');

const app = express();

// Connexion à MongoDB
connectDB()
  .then(() => {
    console.log("MongoDB est connecté");
    // Ne lancer le serveur que si ce fichier est exécuté directement (pas dans les tests)
    if (require.main === module) {
      app.listen(port, () => {
        console.log(`Serveur lancé sur le port ${port}`);
      });
    }
  })
  .catch((err) => {
    console.error("Échec de la connexion MongoDB ->", err);
  });

// Configuration du moteur de vue
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Support pour _method=DELETE dans les formulaires
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/catways', catwayRoutes); // Routes API pour les catways
app.use('/api/reservations', reservationRoutes);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Gestion des erreurs 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Gestionnaire d'erreurs
app.use(function(err, req, res, next) {
  // Définir les variables locales, uniquement l'erreur en développement
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Rendre la page d'erreur
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
