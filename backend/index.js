const express = require('express');
const db = require('./app/db');
const app = express();

const PORT = process.env.PORT || 5000;

app.get('/health', (req, res) => {
  res.send('Backend is healthy and connected to DB!');
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
