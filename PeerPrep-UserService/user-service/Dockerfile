# Build Stage
FROM node:18-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install 
RUN npm install bcrypt

COPY . .

# Run Stage
FROM node:18-alpine AS run
WORKDIR /app

COPY --from=build /app /app

EXPOSE 3001

CMD ["npm", "run", "dev"]
