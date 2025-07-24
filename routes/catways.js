const express = require('express');
const router = express.Router();
const catwayController = require('../controller/catwayController');

/**
 * @swagger
 * tags:
 *   name: Catways
 *   description: Gestion des catways (pontons)
 */

/**
 * @swagger
 * /api/catways:
 *   post:
 *     summary: Créer un nouveau catway
 *     tags: [Catways]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - catwayNumber
 *               - type
 *               - catwayState
 *             properties:
 *               catwayNumber:
 *                 type: number
 *                 description: Numéro du catway
 *               type:
 *                 type: string
 *                 enum: [long, short]
 *                 description: Type de catway
 *               catwayState:
 *                 type: string
 *                 description: État du catway
 *     responses:
 *       201:
 *         description: Catway créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catway'
 *       400:
 *         description: Erreur de validation
 *   get:
 *     summary: Récupérer tous les catways
 *     tags: [Catways]
 *     responses:
 *       200:
 *         description: Liste des catways
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Catway'
 *       500:
 *         description: Erreur serveur
 */
router.post('/', catwayController.createCatway);
router.get('/', catwayController.getAllCatways);

/**
 * @swagger
 * /api/catways/{id}:
 *   get:
 *     summary: Récupérer un catway par ID
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du catway
 *     responses:
 *       200:
 *         description: Catway trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catway'
 *       404:
 *         description: Catway non trouvé
 *   put:
 *     summary: Mettre à jour un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du catway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catwayNumber:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [long, short]
 *               catwayState:
 *                 type: string
 *     responses:
 *       200:
 *         description: Catway mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catway'
 *       404:
 *         description: Catway non trouvé
 *   delete:
 *     summary: Supprimer un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du catway
 *     responses:
 *       200:
 *         description: Catway supprimé
 *       404:
 *         description: Catway non trouvé
 */
router.get('/:id', catwayController.getCatwayById);
router.put('/:id', catwayController.updateCatway);
router.delete('/:id', catwayController.deleteCatway);

module.exports = router;
