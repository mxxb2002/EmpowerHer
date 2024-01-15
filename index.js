// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import the cors middleware
const { MongoClient } = require('mongodb');
const { authenticateUser } = require('./src/middleware/authMiddleware');// Middleware setup


const app = express();
const port = 3004;

app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000', // Update with your frontend URL
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cors()); // Use the cors middleware


const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
console.log('MONGODB_URI:', process.env.MONGODB_URI);


async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

client.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  // Database connection successful
  console.log('Connected to the database');
  
// Apply middleware only to specific routes
app.use('/protected', authenticateUser);
app.use('/documents', authenticateUser);

// Routes setup
const authRoutes = require('./src/routes/authRoutes');
const documentRoutes = require('./src/routes/documentRoutes');
const registerRoutes = require('./src/routes/registerRoutes');

app.use(authRoutes);
app.use(documentRoutes);
app.use(registerRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the EmpowerHer API!');
});


  // Start the server
  app.listen(port, () => {

  console.log(`Server is running on http://localhost:${port}`);
  }).on('error', (err) => {
    console.error('Error starting the server:', err);
  });
  

})
