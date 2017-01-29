const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/stam', (req,res) => {
  console.log("express");
  res.json({"stam": "pip"});
});

app.use('/', express.static(__dirname + '/static'));

io.on('connection', function(socket) {
  console.log("connected. ");
  socket.emit('connected', 'Welcome to the chat server');

  socket.on('please', (data) => {
    console.log("data = ", data);
    io.emit('newMessage', data);
  })
});

http.listen(8080, () => console.log("listening on port 8080..."));
