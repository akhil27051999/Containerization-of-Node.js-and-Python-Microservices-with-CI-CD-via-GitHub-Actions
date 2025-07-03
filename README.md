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

### 🛠️ Sample Dockerfile (Node.js Backend Service)

```Dockerfile

FROM node:18 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM node:18-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app .
ENV PORT=8080
EXPOSE 8080
CMD ["node", "index.js"]
```

### ✅ Commands

```bash
docker build -t backend ./backend
```

---

## ✅ Section 4: Defining Multi-Container Setup with Docker Compose

### 📘 Concept: Local Orchestration

Use Docker Compose for local development and to define the full stack.

### 🛠️ Sample docker-compose.yml of one service

```yaml
version: '3.7' 

services:
  backend:
    build: ./backend  
    ports:
      - "8080:8080"     
    networks:
      - app-network     
    environment:
      - DB_HOST=db
      - DB_USER=root
      - DB_PASSWORD=rootpass
      - DB_NAME=docker_demo
    depends_on:
      - db             
    healthcheck:       
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]  
      interval: 30s    
      timeout: 10s      
      retries: 3        
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "5"
networks:
  app-network:
    driver: bridge     

volumes:
  dbdata:
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

### 🛠️ .github/workflows/backend.yml

```yaml
 
name: Backend Service CI

on:
  push:
    paths:
      - 'backend/**'                    
      - '.github/workflows/backend.yml' 
  pull_request:
    paths:
      - 'backend/**'                    
      - '.github/workflows/backend.yml' 
  workflow_dispatch:                    

jobs:
  backend:
    runs-on: ubuntu-latest             

    steps:
      - name: Check out code
        uses: actions/checkout@v2

      - name: Set up Docker
        run: |
          # Uninstall conflicting containerd packages
          sudo apt-get remove -y containerd containerd.io
          
          # Update package list
          sudo apt-get update

          # Install Docker dependencies
          sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release

          # Add Docker's official GPG key
          curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

          # Set up the stable Docker repository
          echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

          # Install Docker Engine and Docker Compose
          sudo apt-get update
          sudo apt-get install -y docker-ce docker-ce-cli containerd.io
          
          # Install Docker Compose
          sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
          sudo chmod +x /usr/local/bin/docker-compose
          
          # Verify installation
          docker --version
          docker-compose --version

      - name: Build and start backend service with Docker Compose
        run: |
          docker-compose -f docker-compose.yml up -d --build backend

      - name: Wait for backend to be ready
        run: |
          echo "Waiting for backend service to be ready..."
          sleep 30  # Adjust the sleep time based on expected startup time

      - name: Check backend service health
        run: |
          echo "Testing backend service at http://localhost:8080"
          curl -f http://localhost:8080/health || echo "Backend service failed health check!"

      - name: Get backend service logs
        run: |
          echo "Fetching backend service logs"
          docker-compose logs backend

      - name: Get MySQL DB logs
        run: |
          echo "Fetching MySQL DB logs"
          docker-compose logs db

      - name: Check if MySQL service is accessible
        run: |
          echo "Checking if MySQL DB is accessible"
          docker-compose exec db mysqladmin ping -h localhost || echo "MySQL DB is not accessible!"

      - name: Run backend tests
        run: |
          echo "Running backend tests inside backend container"
          docker-compose exec -T backend npm test  # Ensure tests run inside the backend container

      - name: Shut down the Docker containers
        run: |
          docker-compose down
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





