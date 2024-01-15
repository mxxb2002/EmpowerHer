const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { getDocuments } = require('./documentController'); // Import the getDocuments function from documentController

const registerUser = async (req, res) => {
  try {
    // Extract data from the request body
    const { username, password } = req.body;

    // Validate input data 
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Access the users collection from the database
    const usersCollection = db.collection('Users');

    // Check if the username already exists
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the 'users' collection
    await usersCollection.insertOne({
      username,
      password: hashedPassword, // Store the hashed password
      email: req.body.email,   
      name: req.body.name,
      dob: req.body.dob,
      role: req.body.role,
      _id: req.body._id,
      user_id: req.body.user_id,
    });

    // Respond with a success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in register controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  try {
    // Extract data from the request body
    const { username, password } = req.body;

    // Validate input data (add more validation)
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Access the 'users' collection from the database
    const usersCollection = db.collection('Users');

    // Check if the user exists
    const user = await usersCollection.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Check if the provided password matches the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token
    res.json({ token });
  } catch (error) {
    console.error('Error in login controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { registerUser, loginUser };
