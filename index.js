const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

app.get('/stam', (req,res) => {
  console.log("express");
  res.json({"stam": "pip"});
});

app.use('/', express.static(__dirname + '/static'));

const io = require('socket.io')(server);

io.on('connection', function(socket) {
  socket.on('please', (data) => {
    console.log("data = ", data);
  })
});

app.listen(8080, () => console.log("listening on port 8080..."));
