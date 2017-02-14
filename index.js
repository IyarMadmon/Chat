const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const MongoPool = require("./common/dbAccess");

app.use('/', express.static(path.join(__dirname, '/static')));

MongoPool.getInstance(function (db){
    let rooms = db.collection("rooms").find();;
    rooms.each(function(err, item) {
      console.log(item);
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
