const express = require('express');  // Import the Express framework for building the web server
const db = require('./app/db');  // Import the database module for interacting with the database
const app = express();  // Create an instance of an Express application

const PORT = process.env.PORT || 8080;  // Set the port to the value of the environment variable PORT, or default to 8080 if not set
// Ensure this port matches the exposed port in the Dockerfile to avoid any conflicts

// Health check endpoint to verify that the backend is running and connected to the database
app.get('/health', (req, res) => {
  res.send('Backend is healthy and connected to DB!');  // Send a simple message confirming health
});

// Endpoint to get all users from the database
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users')  // Query the database to select all records from the 'users' table
    .then(([results]) => {  // If the query is successful, destructure the results
      res.json(results);  // Return the results as a JSON response
    })
    .catch((err) => {  // If there’s an error with the query
      res.status(500).json({ error: err.message });  // Send a 500 status code with the error message
    });
});

// Ensure the app listens on all network interfaces (0.0.0.0) to be accessible from outside the container
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend listening on port ${PORT}`);  // Log a message when the server successfully starts
});
