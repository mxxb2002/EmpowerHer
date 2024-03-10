require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const { connectToDatabase } = require('./database');

const app = express();

// Parse JSON and URL-encoded data as sent by HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

// Set up express app and middlewares
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Homepage route
app.get('/', (req, res) => {
    res.render('home'); 
});

// Login page route
app.get('/login', (req, res) => {
    res.render('login'); 
});

// POST route for handling login logic
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // look up the user by their email in  database

    // Compare submitted password with the one in the database
    const match = await bcrypt.compare(password, user.password);

    if (match) {
        // Set user information in the session
        req.session.user = user;
        res.redirect('/dashboard'); // Redirect to the dashboard after login
    } else {
        res.status(401).send('Authentication failed');
    }
});
// Route for the dashboard
app.get('/dashboard', (req, res) => {
    // Check if the user is logged in
    if (req.session.user) {
        res.send('Welcome to EmpowerHer!'); // Render or redirect as needed
    } else {
        res.redirect('/login'); // Redirect to login if not authenticated
    }
});
// route handler for POST requests to /submit-contact

// Define routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/home', (req, res) => {
    res.render('home');
});


app.get('/aboutus', (req, res) => {
    res.render('aboutus');
});

app.get('/resources', (req, res) => {
    res.render('resources');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/register', async (req, res) => {
   res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/api', (req, res) => {
    res.render('api');
});

// Connect to MongoDB before starting the server
connectToDatabase(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Failed to connect to the database', error);
    process.exit(1); // Exit the app if we can't connect to the database
  });



