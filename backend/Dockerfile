# Use the official Node.js v18 image from Docker Hub
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only the package.json and package-lock.json (if available) first
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all remaining application source code into the container
COPY . .

# Expose port 5000 so the container can be accessed from the host
EXPOSE 8080

# Health check to verify if the application is running properly
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

# Command to run your app using npm start (from package.json)
CMD ["npm", "start"]
