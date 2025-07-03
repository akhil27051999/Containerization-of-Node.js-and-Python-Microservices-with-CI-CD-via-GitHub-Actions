# 🚀 Microservices Containerization with CI/CD using Github Actions

## 📝 Overview  
This project containerizes a **microservices-based application** using **Docker, Docker Compose, and Docker Swarm**, with **CI/CD automation via GitHub Actions**.  

## ✅ Section 1: Docker Concepts, Commands & Use Cases

### 📘 Core Docker Concepts

| Concept          | Description                                                                |
| ---------------- | -------------------------------------------------------------------------- |
| Docker Image     | A lightweight, standalone package of software that includes code & runtime |
| Docker Container | A running instance of an image                                             |
| Dockerfile       | Script to build Docker images                                              |
| Docker Volume    | Persistent data storage                                                    |
| Docker Compose   | Tool to define and run multi-container applications                        |
| Docker Swarm     | Native container orchestration for Docker                                  |
| Docker Hub       | Cloud-based registry to store and share images                             |

### 🧪 Docker Commands Cheat Sheet (with Use Cases)

```bash
# Version and Info
docker --version                          # Check Docker version

# Image Management
docker build -t image_name .              # Build image from Dockerfile
docker images                             # List all images
docker rmi image_name                     # Remove image

# Container Management
docker run -d -p 8080:80 image_name       # Run container in detached mode
docker ps                                 # List running containers
docker ps -a                              # List all containers

# Logs and Exec
docker logs <container_id>                # View container logs
docker exec -it <container_id> bash       # Enter a running container shell

# Stop & Remove
docker stop <container_id>                # Stop container
docker rm <container_id>                  # Remove container

# Volume Usage
-v host_path:container_path               # Mount volume to persist data

# Docker Compose
docker-compose up -d                      # Start services in detached mode
docker-compose down                       # Stop and remove all services

# Docker Swarm
docker swarm init                         # Initialize swarm

# Networks
docker network ls                         # List networks
docker network create mynet               # Create a user-defined network
```

### 🔍 Real-Time Use Cases

| Tool/Concept | Real World Usage                                     |
| ------------ | ---------------------------------------------------- |
| Dockerfile   | Ensures consistent builds across dev, test, and prod |
| Compose      | Runs full local stack with all microservices         |
| Volumes      | Persist PostgreSQL data between container restarts   |
| Docker Hub   | Share and pull prebuilt images across environments   |
| Swarm        | Simulate production deployment locally with replicas |

### 🔧 Troubleshooting

| Problem                     | Solution                               |
| --------------------------- | -------------------------------------- |
| Container exits immediately | Check CMD or entrypoint                |
| Port already in use         | Change host port mapping               |
| Build fails                 | Validate Dockerfile & context          |
| Volume issues               | Inspect paths and Docker volume config |
| Image pull failed           | Check Docker login and repo settings   |

---

## ✅ Section 2: Project Overview – Microservices 

### 📦 Microservices:

* **Frontend**: Node.js – UI Service
* **Backend**: Node.js – API Service
* **Auth Service**: Python (FastAPI or Django) – Authentication
* **Database**: PostgreSQL or MySQL

---
## ✅ Section 3: Dockerizing Each Microservice

### 🛠️ Sample Dockerfile (Node.js Backend)

```Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
```

### 🛠️ Sample Dockerfile (Python Auth Service)

```Dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### ✅ Commands

```bash
docker build -t frontend ./frontend
docker build -t backend ./backend
docker build -t auth ./auth
```

---

## ✅ Section 4: Defining Multi-Container Setup with Docker Compose

### 📘 Concept: Local Orchestration

Use Docker Compose for local development and to define the full stack.

### 🛠️ docker-compose.yml

```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
  backend:
    build: ./backend
    ports:
      - "5000:5000"
  auth:
    build: ./auth
    ports:
      - "8000:8000"
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: appdb
    volumes:
      - db-data:/var/lib/postgresql/data
volumes:
  db-data:
```

### ✅ Commands

```bash
docker-compose up -d
docker-compose ps
docker-compose logs -f
```

---

## ✅ Section 5: Docker Swarm for Production-Like Orchestration

### 📘 Concept: Swarm Mode

Simulates distributed orchestration on local or remote environments.

### 🛠️ Initialize Swarm

```bash
docker swarm init
```

### 🛠️ Deploy Stack

```bash
docker stack deploy -c docker-compose.yml mystack
docker stack services mystack
docker stack ps mystack
```

---

## ✅ Section 6: GitHub Actions CI/CD Pipeline

### 📘 Concept: Automation with GitHub Actions

Automates build, test, and deployment when code is pushed.

### 🛠️ .github/workflows/cicd.yml

```yaml
name: CI/CD Pipeline
on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Log in to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and Push Images
        run: |
          docker build -t user/frontend:latest ./frontend
          docker build -t user/backend:latest ./backend
          docker build -t user/auth:latest ./auth
          docker push user/frontend:latest
          docker push user/backend:latest
          docker push user/auth:latest
```

---

## ✅ Section 7: Environment Variables & Secrets

### 📘 Concept: Secure Configuration

Sensitive data like DB passwords or Docker Hub credentials should not be hardcoded.

### 🛠️ Configure in GitHub Repo:

* Go to **Settings > Secrets and variables > Actions**
* Add secrets like:

  * `DOCKER_USERNAME`
  * `DOCKER_PASSWORD`

---

## ✅ Section 8: Verification & Troubleshooting

### ✅ Verification

```bash
docker ps
curl http://localhost:3000
curl http://localhost:5000
curl http://localhost:8000
```

### 🔧 Troubleshooting

| Issue                        | Cause                           | Solution                              |
| ---------------------------- | ------------------------------- | ------------------------------------- |
| Docker image build fails     | Bad Dockerfile or missing files | Check paths, logs, and Dockerignore   |
| Service not accessible       | Port not exposed properly       | Review `ports:` section in Compose    |
| Swarm deployment not working | Stack config error              | Validate with `docker-compose config` |
| GitHub Action fails          | Wrong Docker credentials        | Recheck repository secrets            |
| Container crashing on start  | Wrong CMD or missing dependency | Check logs and Dockerfile             |

---

# 📃 Final Commands Summary 

```bash
# Docker Builds
cd frontend && docker build -t frontend .
cd backend && docker build -t backend .
cd auth && docker build -t auth .

# Docker Compose (local)
docker-compose up -d
docker-compose logs -f

# Docker Swarm
docker swarm init
docker stack deploy -c docker-compose.yml mystack
docker stack ps mystack

# Docker Image Push (Manual or CI/CD)
docker login -u <user>
docker push <image>

# GitHub Actions (CI/CD)
# - On push to main, the pipeline builds and pushes all images to Docker Hub
# - Docker credentials are securely managed in GitHub Secrets
```





