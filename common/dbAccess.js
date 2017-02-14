var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

RoomCollector = function() {
  this.db= new Db('chat', new Server("localhost", 27017, {safe: false}, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};

RoomCollector.prototype.getCollection= function(callback) {
  this.db.collection('rooms', function(error, room_collection) {
    if( error ) callback(error);
    else callback(null, room_collection);
  });
};

//find all rooms
RoomCollector.prototype.findByQuery = function(callback, query) {
    this.getCollection(function(error, room_collection) {
      if( error ) callback(error);
      else {
        room_collection.find(query, {_id:0}).toArray(function(error, results) {
          if( error ) callback(error);
          else callback(null, results);
        });
      }
    });
};

RoomCollector.prototype.findAll = function(callback) {
  this.findByQuery(callback, {});
}

exports.RoomCollector = RoomCollector;
