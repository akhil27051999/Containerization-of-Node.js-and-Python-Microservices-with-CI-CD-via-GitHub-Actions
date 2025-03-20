from flask import Flask, request, jsonify
import jwt
import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'docker-secret-key'  # 🔐 In production, use environment variable for better security

# 🧪 Dummy user credentials for demo/testing purpose
users = {
    "admin": "password123"
}

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # ✅ Authenticate user and return JWT token
    if username in users and users[username] == password:
        token = jwt.encode({
            'user': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, app.config['SECRET_KEY'], algorithm='HS256')
        return jsonify({'token': token})
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/verify', methods=['POST'])
def verify_token():
    # 🔍 Get token from Authorization header
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'message': 'Token missing'}), 401

    try:
        decoded = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        return jsonify({'user': decoded['user']})
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401

@app.route('/health')
def health():
    return "Auth service is healthy!", 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6000)
