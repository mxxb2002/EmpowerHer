// src/controllers/registerController.js
const bcrypt = require('bcrypt');
const db = require('../db');

const registerControllerMethod = async (req, res) => {
  try {
    // Extract data from the request body
    const { username, password } = req.body;

    // Validate input data (add more validation)
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Access the 'users' collection from the database
    const usersCollection = db.collection('Users');

    // Check if the username already exists
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 15);
    await usersCollection.insertOne({
      username,
      password: hashedPassword, // Store the hashed password
      email,
      name,
      dob,
      role,
    // Insert the new user into the 'Users' collection
  });

    // Respond with a success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in register controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { registerControllerMethod };
