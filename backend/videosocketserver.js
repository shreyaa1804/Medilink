// videoSocketServer.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  // Join a specific room
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`📥 ${socket.id} joined room: ${roomId}`);
    socket.to(roomId).emit('user-joined', socket.id); // Notify others in the room
  });

  // Handle offer
  socket.on('offer', ({ offer, roomId }) => {
    socket.to(roomId).emit('receive-offer', { offer });
  });

  // Handle answer
  socket.on('answer', ({ answer, roomId }) => {
    socket.to(roomId).emit('receive-answer', { answer });
  });

  // Handle ICE candidate
  socket.on('ice-candidate', ({ candidate, roomId }) => {
    socket.to(roomId).emit('receive-candidate', { candidate });
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

// Start server
const PORT = 5055;
server.listen(PORT, () => {
  console.log(`🚀 Signaling server running at http://localhost:${PORT}`);
});
