# Use an official Node.js runtime as the base image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN touch src/main/resources/gcp-service-account-key.json

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the dev server runs on
EXPOSE 5173

# Command to run the development server
CMD ["npm", "run", "dev"]