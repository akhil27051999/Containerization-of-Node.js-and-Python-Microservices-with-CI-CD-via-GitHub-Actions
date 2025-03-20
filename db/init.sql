CREATE DATABASE IF NOT EXISTS docker_demo;
USE docker_demo;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

INSERT INTO users (username, email) VALUES 
('Alice', 'alice@example.com'),
('Bob', 'bob@example.com');
