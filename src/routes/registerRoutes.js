const express = require('express');
const router = express.Router();
const { registerControllerMethod } = require('../controllers/registerController');

router.post('/', registerControllerMethod);  // Use registerControllerMethod directly

module.exports = router;
