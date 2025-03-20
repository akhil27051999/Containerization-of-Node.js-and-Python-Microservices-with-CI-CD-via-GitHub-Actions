# Use official Node.js 18 image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy only the package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install the dependencies inside the container
RUN npm install

# Copy the rest of the application files (source code)
COPY . .

# Set environment variable for PORT (default to 8080)
ENV PORT 8080

# Expose port 8080, which the app will listen on
EXPOSE 8080

# Start the Node.js application
CMD ["node", "index.js"]
