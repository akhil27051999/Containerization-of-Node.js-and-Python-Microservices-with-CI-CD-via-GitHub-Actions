# Import necessary libraries: Flask for the web framework, request for handling HTTP requests, 
# jsonify for returning JSON responses, jwt for working with JSON Web Tokens, and datetime for handling expiration time.
from flask import Flask, request, jsonify
import jwt
import datetime

# Initialize the Flask application instance
app = Flask(__name__)

# Configure the application with a secret key (in production, this should be an environment variable for security)
app.config['SECRET_KEY'] = 'docker-secret-key'  # 🔐 In production, use environment variable for better security

# 🧪 Dummy user credentials for demo/testing purposes (in production, this should be fetched from a secure database)
users = {
    "admin": "password123"
}

# Login route to authenticate a user and return a JWT token
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()  # Get the JSON data from the request
    username = data.get("username")  # Extract the 'username' from the JSON
    password = data.get("password")  # Extract the 'password' from the JSON

    # ✅ Authenticate user and return JWT token if valid credentials are provided
    if username in users and users[username] == password:
        # Create a JWT token with an expiration time of 1 hour
        token = jwt.encode({
            'user': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token expires in 1 hour
        }, app.config['SECRET_KEY'], algorithm='HS256')  # Encode token using the secret key and HS256 algorithm
        return jsonify({'token': token})  # Return the token in the response
    # If credentials are invalid, return an error message with a 401 Unauthorized status
    return jsonify({'message': 'Invalid credentials'}), 401

# Verify token route to validate the JWT token provided in the request
@app.route('/verify', methods=['POST'])
def verify_token():
    # 🔍 Get token from Authorization header in the request
    token = request.headers.get('Authorization')  # Retrieve token from headers
    if not token:
        return jsonify({'message': 'Token missing'}), 401  # Return an error if no token is provided

    try:
        # Decode the JWT token using the secret key
        decoded = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        return jsonify({'user': decoded['user']})  # Return the user information from the decoded token
    except jwt.ExpiredSignatureError:
        # If the token has expired, return an error message with a 401 Unauthorized status
        return jsonify({'message': 'Token expired'}), 401
    except jwt.InvalidTokenError:
        # If the token is invalid, return an error message with a 401 Unauthorized status
        return jsonify({'message': 'Invalid token'}), 401

# Health check route to confirm the auth service is running correctly
@app.route('/health')
def health():
    return "Auth service is healthy!", 200  # Return a simple message indicating the service is healthy

# Start the Flask application and listen on all network interfaces (0.0.0.0) and port 6000
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6000)
