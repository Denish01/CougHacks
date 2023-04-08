const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mongodb = require('mongodb');

// Connection URI for MongoDB
const uri = 'mongodb://localhost:27017/password-manager';

// Create a MongoClient instance and connect to the database
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err) => {
  if (err) throw err;
  console.log('Connected to MongoDB');
  // Create a collection for storing passwords
  const passwordCollection = client.db('password-manager').collection('passwords');
});

// Set up middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Define a route for saving a new password
app.post('/passwords', (req, res) => {
  const { username, password } = req.body;
  // Hash the password with bcrypt
  const hashedPassword = bcrypt.hashSync(password, 10);
  // Store the hashed password in the database
  passwordCollection.insertOne({ username, password: hashedPassword }, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error saving password');
    } else {
      res.status(201).send('Password saved successfully');
    }
  });
});

// Define a route for getting all saved passwords
app.get('/passwords', (req, res) => {
  // Query the database for all passwords and return them as JSON
  passwordCollection.find().toArray((err, passwords) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error getting passwords');
    } else {
      res.json(passwords);
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
