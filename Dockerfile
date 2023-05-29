# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files for frontend
COPY client/package*.json ./client/
RUN cd client && npm install

# Copy the package.json and package-lock.json files for backend
COPY server/package*.json ./server/
RUN cd server && npm install

# Copy the frontend and backend directories to the container
COPY client/ ./client
COPY server/ ./server

# Build the frontend
RUN cd client && npm run build

# Expose the port on which the application runs
EXPOSE 5000

# Start the server
CMD cd server && npm run dev:server