const Db = require('mongodb').Db;
const Server = require('mongodb').Server;
const _ = require('lodash');

let p_db;
let p_rooms;
const MAX_QUEUE_SIZE = 3;

RoomCollector = function() {
  p_db = new Db('chat', new Server("localhost", 27017, {safe: false}, {auto_reconnect: true}, {}));
  p_db.open()
  .then(() =>  {
    console.log("Connected to DB");
    init();
  })
  .catch(err => {
    console.log("error connection to DB", "-----working offline");
  }) ;
};

const init = () => {
  getCollection('rooms')
  .then(room_collection => {
    room_collection.find({}, {_id:0}).toArray(function(error, results) {
      p_rooms = results;
    });
  })
  .catch(err => {
    console.log("error retrieving room collection");
  })
}

const getCollection = (collectionName) => {
  return new Promise((resolve,reject) =>  {
    p_db.collection(collectionName, (error, collection) => {
      if(!error) {
        resolve(collection);
      } else {
        reject(error);
      }
    });
  })
}

RoomCollector.prototype.getAllRooms = function() {
  return p_rooms.map(room => {
    return _.pick(room, ['id','name']);
  });
}

RoomCollector.prototype.getRoomMessages = function(roomId) {
  return p_rooms.filter(room => room.id == roomId)[0];
}

RoomCollector.prototype.addNewMessage = function(messageInput) {
  const message = _.pick(messageInput, ['sender', 'content', 'time']);
  const messageRoomId = messageInput.room;
  const roomMessages = p_rooms.filter(room => messageRoomId == room.id)[0].messages;

  if(roomMessages.length >= MAX_QUEUE_SIZE) {
    const messageToInsert = _.pick(roomMessages.shift(), ['sender', 'content', 'time']) ;

    getCollection('rooms')
    .then(room_collection => {
      room_collection.updateOne(
          {id:parseInt(messageRoomId)},
          {
            $push:{
              messages: messageToInsert
            }
          });
      console.log("row inserted successfully to DB");
    })
    .catch(err => {
      console.log("erro insert message - ", messageInput, " - to DB");
    });
  }
   roomMessages.push(message);
}

exports.RoomCollector = RoomCollector;
