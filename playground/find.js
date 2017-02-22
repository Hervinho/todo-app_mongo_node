//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');//ObjectID helps create new object id's

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (error, db) => {
  if(error){
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  //Get all documents in Todos collection into an array.
  //P.S toArray returns a promise.
  /*db.collection('Todos').find({
    //completed: true
    _id: new ObjectID('58ad8689b89dc52c2c4282b1')
  }).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch Todos', err);
  });*/

  db.collection('Todos').find({
    //completed: true
    _id: new ObjectID('58ad8689b89dc52c2c4282b1')
  }).count().then((count) => {
    console.log('Todos count: ', count);
  }, (err) => {
    console.log('Unable to fetch Todos', err);
  });

  db.collection('Users').find({
    name: 'su'
  }).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch Todos', err);
  });

  //Close DB connection
  db.close();
});
