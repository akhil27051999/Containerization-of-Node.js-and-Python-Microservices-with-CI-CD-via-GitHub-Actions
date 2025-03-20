-- Create the database 'docker_demo' if it doesn't exist already
CREATE DATABASE IF NOT EXISTS docker_demo;

-- Switch to the 'docker_demo' database
USE docker_demo;

-- Create the 'users' table if it doesn't exist already
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Auto-incrementing primary key for each user
    username VARCHAR(100) NOT NULL,     -- Column to store username (maximum 100 characters)
    email VARCHAR(100) NOT NULL         -- Column to store email (maximum 100 characters)
);

-- Insert sample data into the 'users' table
INSERT INTO users (username, email) VALUES 
('Alice', 'alice@example.com'),  -- Insert Alice's username and email
('Bob', 'bob@example.com');     -- Insert Bob's username and email
