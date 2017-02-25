const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const RoomCollector = require("./common/dbAccess").RoomCollector;

app.use('/', express.static(path.join(__dirname, '/static')));

const roomCollector= new RoomCollector();

app.get('/rooms', (req, res) => {
  res.json(roomCollector.getAllRooms());
});

app.get('/room/messages/:roomid', (req, res) => {
  const roomId = req.params.roomid;
  res.json(roomCollector.getRoomMessages(roomId));
});

io.on('connection', function(socket) {
  console.log("connected. ");
  socket.emit('connected', 'Welcome to the chat server');

  socket.on('newMessage', (data) => {
    console.log("data = ", data);
    roomCollector.addNewMessage(data);
    io.to(data.room).emit('newMessage', data);
  });

  socket.on("subscribeToRoom", (data) => {
    roomCollector.addParticipantToRoom(data);
    socket.join(data.roomId);
  });

  socket.on("unSubscribeFromRoom", (data) => {
    roomCollector.removeParticipantFromRoom(data);
    socket.leave(data.roomId);
  });

  socket.on('disconnect', () => {
    console.log("disconnect");
  });
});

http.listen(8080, () => {
  console.log("listening on port 8080...");
});
