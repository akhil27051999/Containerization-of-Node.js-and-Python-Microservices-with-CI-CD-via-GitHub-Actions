# ====================
# Stage 1: Build Stage
# ====================
FROM node:18 as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy rest of the source code
COPY . .

# ===========================
# Stage 2: Production Stage
# ===========================
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy only package files and install **only production dependencies**
COPY package*.json ./
RUN npm install --omit=dev

# Copy built app files from builder stage
COPY --from=builder /app .

# Set environment variable for PORT
ENV PORT=8080

# Expose the application port
EXPOSE 8080

# Start the Node.js application
CMD ["node", "index.js"]
