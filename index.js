var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/gym';
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  insertDocuments(db, function() {
    db.close();
  });
});


var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('something');
  // Insert some documents
  collection.save({"names": ["itzk", "dotan"], "surname": "kabali", "mz": "201271269"} , function(err, result) {
    assert.equal(err, null);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
};
