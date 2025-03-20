const mysql = require('mysql2');  // Import the mysql2 package for interacting with MySQL database
require('dotenv').config();  // Load environment variables from a .env file

// Create a pool of connections for better performance and management
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',  // Use the DB_HOST environment variable or default to 'localhost'
  user: process.env.DB_USER || 'root',  // Use the DB_USER environment variable or default to 'root'
  password: process.env.DB_PASSWORD || '',  // Use the DB_PASSWORD environment variable or default to an empty string
  database: process.env.DB_NAME || 'docker_demo',  // Use the DB_NAME environment variable or default to 'docker_demo'
  waitForConnections: true,  // Allow the pool to wait for a connection when all connections are in use
  connectionLimit: 10,  // Limit the maximum number of connections in the pool to 10
  queueLimit: 0  // Set the maximum length of the connection queue (0 means no limit)
});

// Export a promise-based connection pool for easier async handling
const db = pool.promise();  // Convert the pool to a promise-based API for better async/await support

// Test the connection (optional but useful for debugging)
db.getConnection()  // Attempt to get a connection from the pool
  .then(() => {
    console.log('Connected to MySQL DB');  // Log success if the connection is established
  })
  .catch((err) => {
    console.error('Database connection failed:', err.stack);  // Log an error if the connection fails
  });

// Export the connection pool for use in other parts of the application
module.exports = db;
