//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');//ObjectID helps create new object id's

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (error, db) => {
  if(error){
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  //deleteMany
  /*db.collection('Todos').deleteMany({
    text: 'Eat lunch'
  }).then((result) => {
    console.log(result);
  }, (err) => {
    console.log('Unable to delete Todos', err);
  });*/

  //deleteOne : deletes the first object detected
  /*db.collection('Todos').deleteOne({
    text: 'Eat lunch'
  }).then((result) => {
    console.log(result);
  }, (err) => {
    console.log('Unable to delete Todo', err);
  });*/

  //findOneAndDelete
  /*db.collection('Todos').findOneAndDelete({
    completed: false
  }).then((result) => {
    console.log(result);
  }, (err) => {
    console.log('Unable to find and delete Todo', err);
  });*/
  db.collection('Users').findOneAndDelete({
    //_id: 1
    _id: new ObjectID('58aeb9f38acc9d6bf480a1ce')
  }).then((result) => {
    console.log(result);
  }, (err) => {
    console.log('Unable to find and delete Todo', err);
  });

  //Close DB connection
  //db.close();
});
