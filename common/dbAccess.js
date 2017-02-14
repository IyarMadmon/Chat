const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017/chat';

var p_db;

function MongoPool(){}

function initPool(cb){
  MongoClient.connect(url,  function(err, db) {
    if (err) throw err;

    p_db = db;
    if(cb && typeof(cb) == 'function')
        cb(p_db);
  });
  return MongoPool;
}

MongoPool.getInstance = (cb) => {
  if(!p_db){
    initPool(cb)
  }
  else{
    if(cb && typeof(cb) == 'function')
      cb(p_db);
  }
}

module.exports = MongoPool;
