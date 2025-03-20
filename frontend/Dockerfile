# Stage 1: Build the Frontend
FROM node:18 as build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Build the production-ready React app
RUN npm run build


# Stage 2: Serve the frontend using Nginx
FROM nginx:alpine

# Copy the build folder from the previous stage into Nginx's web directory
COPY --from=build /app/build /usr/share/nginx/html

# (Optional) Copy custom Nginx config file if you have one
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to allow traffic
EXPOSE 80

# (Optional) Add a health check to ensure the container is healthy
HEALTHCHECK CMD curl --fail http://localhost || exit 1
