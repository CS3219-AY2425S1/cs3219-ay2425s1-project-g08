// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

const users = {} // Keep track of the users and their rooms

io.on('connection', (socket) => {
  console.log('New client connected');

  /* User joins a room */
  socket.on('joinRoom', ({ userId, roomId }) => {
    users[socket.id] = { userId, roomId }; // Save user info
    socket.join(roomId); // Join the specified room
    console.log(`${userId} joined room ${roomId}`);
  });

  /* Send message to specific room */
  socket.on('sendMessage', ({roomId, message}) => {
    socket.to(roomId).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    delete users[socket.id];
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
