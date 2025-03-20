const mysql = require('mysql2');
require('dotenv').config();

// Create a pool of connections for better performance and management
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'docker_demo',
  waitForConnections: true,
  connectionLimit: 10, // Limit the number of connections to the pool
  queueLimit: 0
});

// Export a promise-based connection pool for easier async handling
const db = pool.promise();

// Test the connection (optional but useful for debugging)
db.getConnection()
  .then(() => {
    console.log('Connected to MySQL DB');
  })
  .catch((err) => {
    console.error('Database connection failed:', err.stack);
  });

module.exports = db;
