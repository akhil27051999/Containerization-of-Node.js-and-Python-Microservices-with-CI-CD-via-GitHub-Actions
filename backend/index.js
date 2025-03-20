const express = require('express');
const db = require('./app/db');
const app = express();

const PORT = process.env.PORT || 8080; // Ensure this matches the exposed port in the Dockerfile

app.get('/health', (req, res) => {
  res.send('Backend is healthy and connected to DB!');
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users')
    .then(([results]) => {
      res.json(results);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Ensure the app listens on all network interfaces (0.0.0.0)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend listening on port ${PORT}`);
});
