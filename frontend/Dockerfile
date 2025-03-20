# Use an official Node.js image as the base for building the frontend
FROM node:18

# Set the working directory inside the container to /app
# All following commands will run in this directory
WORKDIR /app

# Copy the package.json file (contains project metadata and dependencies)
COPY package.json ./

# Install all dependencies listed in package.json
RUN npm install

# Copy the remaining project files (source code, public folder, etc.) into the container
COPY . .

# Build the React application (creates an optimized static build in the /build folder)
RUN npm run build

# Use a lightweight NGINX image to serve the built React app
FROM nginx:alpine

# Copy the static build files from the previous stage into NGINX’s default web directory
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80 so that the container can be accessed via HTTP
EXPOSE 80

# Start NGINX in the foreground so that the container keeps running
CMD ["nginx", "-g", "daemon off;"]
