const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const RoomCollector = require("./common/dbAccess").RoomCollector;

app.use('/', express.static(path.join(__dirname, '/static')));

const roomCollector= new RoomCollector();

app.get('/rooms', (req, res) => {
  roomCollector.findAll(function(error, rooms){
        res.json(rooms);
  });
});

app.get('/room/messages/:roomid', (req, res) => {
  const roomId = req.params.roomid;
  roomCollector.findRoomMessages(roomId, function(error, roomMessages){
        res.json(roomMessages);
  });
});

io.on('connection', function(socket) {
  console.log("connected. ");
  socket.emit('connected', 'Welcome to the chat server');

  socket.on('newMessage', (data) => {
    console.log("data = ", data);
    io.to(data.room).emit('newMessage', data);
  });

  socket.on("roomChange", (data) => {
    socket.join(data);
  });

  socket.on("subscribeToRoom", (data) => {
    console.log("subscribe", data);
    socket.join(data);
  });

  socket.on("unSubscribeFromRoom", (data) => {
    console.log("unsubscribe", data);
    socket.leave(data);
  });

  socket.on('disconnect', () => {
    console.log("disconnect");
  });
});

http.listen(8080, () => console.log("listening on port 8080..."));
