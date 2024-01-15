// authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
//const { authenticateUser } = require('../middleware/authMiddleware'); // Import authenticateUser

// Open registration route without authentication
router.post('/register', registerUser);
// Open login route without authentication
router.post('/login', loginUser);

// Protected route requiring authentication
router.get('/protected', authenticateUser, (req, res) => {
    res.send(`Hello, ${req.user.username}!`);
  });

module.exports = router;
