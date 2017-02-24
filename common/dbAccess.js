const Db = require('mongodb').Db;
const Server = require('mongodb').Server;
const _ = require('lodash');

let p_db;
let p_rooms;
const MAX_QUEUE_SIZE = 5;

RoomCollector = function() {
  p_db = new Db('chat', new Server("localhost", 27017, {safe: false}, {auto_reconnect: true}, {}));
  p_db.open().then(() =>  {
    console.log("Connected to DB");
    init();
  }).catch(err => {
    console.log("error connection to DB", "-----working offline");
  }) ;
};

const init = function() {
  getCollection(function(err, room_collection) {
    room_collection.find({}, {_id:0}).toArray(function(error, results) {
      p_rooms = results;
    })
  });
}

const getCollection= function(callback) {
  p_db.collection('rooms', function(error, room_collection) {
    if( error ) callback(error);
    else callback(null, room_collection);
  });
};

RoomCollector.prototype.getAllRooms = function() {
  return p_rooms.map(room => {
    return _.pick(room, ['id','name']);
  });
}

RoomCollector.prototype.getRoomMessages = function(roomId) {
  return p_rooms.filter(room => room.id == roomId)[0];
}

RoomCollector.prototype.addNewMessage = function(message) {
  p_rooms.filter(room => message.room == room.id)[0].messages.push(_.pick(message, ['sender', 'content', 'time']));
}

exports.RoomCollector = RoomCollector;
