# syntax=docker/dockerfile:1

# Specify the base image with Node.js.
ARG NODE_VERSION=18.0.0
FROM node:${NODE_VERSION}-alpine

# Set the working directory.
WORKDIR /usr/src

# Install dependencies.
RUN npm install -g typescript

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies.
RUN npm ci --omit=dev

# Copy the rest of the source files into the image.
COPY . .

# Compile TypeScript to JavaScript.
RUN npx tsc

# Run the application as a non-root user.
USER node

# Set the command to run the application.
CMD ["node", "dist/index.js"]
