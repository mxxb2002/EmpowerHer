const express = require('express');
const router = express.Router();
const authRoutes = require('./routes/authRoutes'); 


// Import  route handlers/controllers here
const registerController = require('./controllers/registerController').registerControllerMethod;
const loginController = require('./controllers/loginController');
const documentsController = require('./controllers/documentsController');


// Registration endpoint
router.post('/register', registerController);

// Login endpoint
router.post('/login', loginController);

// Protected route
router.get('/protected', verifyToken, (req, res) => {
  res.send(`Hello, ${req.user.username}!`);
});

// Retrieve all documents from the MongoDB collection
router.get('/documents', verifyToken, documentsController);

module.exports = router;
