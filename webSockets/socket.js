const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const {Server} =    require('socket.io');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'socket.html'));
  });

  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg)
    });

    
  });

 

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});