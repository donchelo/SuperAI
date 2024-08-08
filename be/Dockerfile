# Use the official Node.js image as a base image
FROM node:lts-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY ./be/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./be ./

# Expose the port the app runs on
EXPOSE 3001

# Run the application
CMD ["npm", "run", "start"]