// var MongoClient = require('mongodb').MongoClient
//   , assert = require('assert');
//
// // Connection URL
// var url = 'mongodb://localhost:27017/gym';
// // Use connect method to connect to the server
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//
//   insertDocuments(db, function() {
//     db.close();
//   });
// });
//
//
// var insertDocuments = function(db, callback) {
//   // Get the documents collection
//   var collection = db.collection('something');
//   // Insert some documents
//   collection.save({"names": ["itzk", "dotan"], "surname": "kabali", "mz": "201271269"} , function(err, result) {
//     assert.equal(err, null);
//     console.log("Inserted 3 documents into the collection");
//     callback(result);
//   });
// };
// var http = require('http');
//
// var server = http.createServer();
//
// server.on("request", (request, response) => {
//   response.writeHead(200);
//   response.write("Hello, this is Shoham");
//   console.log("Yes!!!");
//   response.end();
// });
//
// server.listen(8080);
// console.log("listening...");

const express = require('express');
const path = require('path');

const app = express();

app.get('/stam', (req,res) => {
  console.log("express");
  res.json({"stam": "pip"});
});

console.log("__dirname ", __dirname);

app.use('/', express.static(path.join(__dirname,'static')));

app.listen(8080);

// app.get('/tweets/:username', (req,res) => {
//   console.log("twitter");
//   const username = req.params.username;
// console.log('username = ${username}');
//   options = {
//     protocol:"http:",
//     host:"api.twitter.com",
//     pathname: '1.1/statuses/user_timeline.json',
//     query:{screen_name:username, count:10}
//   }
//   const twitterUrl = url.format(options);
//   request(twitterUrl).pipe(res);
//
// });
// app.listen(8080);
// console.log("listening...");
