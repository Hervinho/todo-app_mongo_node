// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  var query = {'details.time': '10.00 am'};
  var projection = {"text": 1, "completed": 1, "_id": 0}; //setting fields to 1 means that's the only field we will use.

  //using cursors to stream data instead of consuming everything at once.
  var cursor = db.collection('Todos').find(query)

  //use projection
  cursor.project(projection);

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
