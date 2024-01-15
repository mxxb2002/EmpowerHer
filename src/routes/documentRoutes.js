// src/routes/documentRoutes.js
const express = require('express');
const router = express.Router();
const { getDocuments } = require('../controllers/documentController');
const { authenticateUser } = require('../middleware/authMiddleware'); // Import authenticateUser

// Apply the middleware only to the documents route
router.get('/', authenticateUser, getDocuments);
router.get('/', getDocuments);

module.exports = router;
