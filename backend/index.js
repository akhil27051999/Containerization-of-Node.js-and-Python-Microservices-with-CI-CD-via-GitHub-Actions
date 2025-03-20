// Importing the Express.js module
const express = require('express');

// Creating an instance of an Express application
const app = express();

// Defining the port number where the server will listen
const PORT = 8080;

// Route to handle GET request to the root URL ("/")
// It sends a simple response message when accessed
app.get('/', (req, res) => {
    res.send("Hello from Backend API");
});

// Route to handle GET request to "/health"
// It is typically used for health checks in production environments
app.get('/health', (req, res) => {
    res.status(200).send("Healthy");
});

// Starting the server and making it listen on the defined port
// This callback will log a message when the server is up and running
app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});
