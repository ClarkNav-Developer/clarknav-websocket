const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for all routes

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('gpsUpdate', (data) => {
    console.log('GPS Update received:', data);
    io.emit('gpsUpdate', data); // Broadcast to all clients
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));