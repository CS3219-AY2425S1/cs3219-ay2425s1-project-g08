FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# TO EDIT
# Not sure if this part is needed for compiling typescript to javascript
RUN npm install -g typescript
RUN npx tsc

EXPOSE 3000

# Define the command to run your app
# TO EDIT
CMD ["node", "dist/index.js"]
