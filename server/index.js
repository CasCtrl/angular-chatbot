// server/index.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ---- Setup paths ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---- Express + Socket.io ----
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// ---- Socket.io Events ----
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('get_positions', () => {
    try {
      const dataPath = path.join(__dirname, 'positions.json');
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      socket.emit('positions', data);
    } catch (err) {
      console.error('Error reading positions.json:', err);
      socket.emit('error', { message: 'Could not load positions data.' });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// ---- Serve static files from /public ----
const clientPath = path.join(__dirname, 'public');
if (fs.existsSync(clientPath)) {
  app.use(express.static(clientPath));

  // ✅ Correct fallback route for Express 5
  app.use((_req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });
} else {
  console.warn('⚠️  Public folder not found. Make sure /server/public exists.');
}

// ---- Start Server ----
const PORT = 8081;
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
