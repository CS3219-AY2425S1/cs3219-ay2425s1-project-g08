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

io.on('connection', (socket) => {
  console.log('Client connected');

  /* Join a room */
  socket.on('joinRoom', ({ userId, roomId }) => {
    socket.join(roomId);
    console.log(`${userId} joined room ${roomId}`);
  });

  /* Send message to specific room */
  socket.on('sendMessage', ({roomId, message}) => {
    socket.to(roomId).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
