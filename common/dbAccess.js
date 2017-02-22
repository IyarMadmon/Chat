var Db = require('mongodb').Db;
var Server = require('mongodb').Server;



RoomCollector = function() {
  const initFunc = this.init.bind(this);
  this.db= new Db('chat', new Server("localhost", 27017, {safe: false}, {auto_reconnect: true}, {}));
  this.db.open(function(){
    console.log("Connected to DB");
    initFunc();
  });
};

RoomCollector.prototype.init = function() {
  const updateObj = this.updateRoomsObject.bind(this);
  this.findAll(function(err, results) {
    updateObj(results);
  });
}

RoomCollector.prototype.updateRoomsObject = function(newObj) {
  this.rooms = newObj;
}

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

RoomCollector.prototype.findAll = function(callback, fields) {
  if(this.rooms) {
    callback(null, this.rooms);
  } else {
      this.findByQuery(callback, {}, fields ? fields : {_id:0});
  }
}

RoomCollector.prototype.findRoomMessages = function(roomId, callback) {
  this.findByQuery(callback, {id:parseInt(roomId)}, {_id:0, name:0});
}

exports.RoomCollector = RoomCollector;
