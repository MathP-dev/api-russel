/**
 * Utilitaires pour les controllers
 */

/**
 * Détermine si une requête provient de l'API ou de l'interface web
 * @param {Object} req - Objet de requête Express
 * @returns {boolean} - true si c'est une requête API
 */
function isApiRequest(req) {
  return req.xhr || 
         (req.headers.accept && req.headers.accept.indexOf('json') > -1) ||
         req.originalUrl.startsWith('/api/');
}

/**
 * Gère les réponses en fonction du type de requête (API/Web)
 * @param {Object} res - Objet de réponse Express
 * @param {Object} req - Objet de requête Express
 * @param {Object} data - Données à renvoyer
 * @param {string} redirectPath - Chemin de redirection pour le web
 * @param {number} statusCode - Code de statut HTTP (défaut: 200)
 */
function handleResponse(res, req, data, redirectPath, statusCode = 200) {
  if (isApiRequest(req)) {
    res.status(statusCode).json(data);
  } else {
    res.redirect(redirectPath);
  }
}

/**
 * Gère les erreurs en fonction du type de requête (API/Web)
 * @param {Object} res - Objet de réponse Express
 * @param {Object} req - Objet de requête Express
 * @param {Error} error - Erreur à traiter
 * @param {string} webMessage - Message d'erreur pour l'interface web
 * @param {number} statusCode - Code de statut HTTP (défaut: 400)
 */
function handleError(res, req, error, webMessage, statusCode = 400) {
  console.error(error);
  
  if (isApiRequest(req)) {
    res.status(statusCode).json({ error: error.message });
  } else {
    res.status(statusCode).render('error', { 
      message: webMessage,
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
}

module.exports = {
  isApiRequest,
  handleResponse,
  handleError
};
