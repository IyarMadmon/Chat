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
RoomCollector.prototype.findByQuery = function(callback, query, fieldSelector) {
    this.getCollection(function(error, room_collection) {
      if( error ) callback(error);
      else {
        room_collection.find(query, fieldSelector).toArray(function(error, results) {
          if( error ) callback(error);
          else callback(null, results);
        });
      }
    });
};

RoomCollector.prototype.findAll = function(callback) {
  this.findByQuery(callback, {}, {_id:0, messages:0});
}

RoomCollector.prototype.findRoomMessages = function(roomId, callback) {
  this.findByQuery(callback, {id:parseInt(roomId)}, {_id:0, name:0});
}

exports.RoomCollector = RoomCollector;
