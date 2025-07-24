const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Port Russell API',
      version: '1.0.0',
      description: 'API de gestion du Port Russell - Catways et Réservations',
      contact: {
        name: 'Port Russell',
        email: 'admin@portrussell.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:8888',
        description: 'Serveur de développement'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID unique de l\'utilisateur'
            },
            name: {
              type: 'string',
              description: 'Nom de l\'utilisateur'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Adresse email de l\'utilisateur'
            },
            password: {
              type: 'string',
              description: 'Mot de passe (haché)'
            }
          }
        },
        Catway: {
          type: 'object',
          required: ['catwayNumber', 'type', 'catwayState'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID unique du catway'
            },
            catwayNumber: {
              type: 'number',
              description: 'Numéro du catway'
            },
            type: {
              type: 'string',
              enum: ['long', 'short'],
              description: 'Type de catway'
            },
            catwayState: {
              type: 'string',
              description: 'État du catway'
            }
          }
        },
        Reservation: {
          type: 'object',
          required: ['catwayNumber', 'clientName', 'boatName', 'checkIn', 'checkOut'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID unique de la réservation'
            },
            catwayNumber: {
              type: 'number',
              description: 'Numéro du catway réservé'
            },
            clientName: {
              type: 'string',
              description: 'Nom du client'
            },
            boatName: {
              type: 'string',
              description: 'Nom du bateau'
            },
            checkIn: {
              type: 'string',
              format: 'date-time',
              description: 'Date d\'arrivée'
            },
            checkOut: {
              type: 'string',
              format: 'date-time',
              description: 'Date de départ'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Message d\'erreur'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './controller/*.js'], // Chemins vers les fichiers contenant les annotations Swagger
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi
};
