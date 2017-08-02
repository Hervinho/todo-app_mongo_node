// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  var query = {'duration': {$exists: true}};

  //using cursors to stream data instead of consuming everything at once.
  var cursor = db.collection('Todos').find(query);
  cursor.sort({"duration": 1}); //sort by ascending order.

  cursor.forEach(
    (doc) => {
      console.log('Todos');
      console.log(JSON.stringify(doc, undefined, 2));
    },
    (err) => {
      if(err != null){
        console.log('Unable to fetch todos', err);
      }
    }
  );

  db.close();
});
