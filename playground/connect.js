//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');//ObjectID helps create new object id's

/*var obj = new ObjectID();
console.log(obj);
*/
/*
//This is called destructuring of an object.
var user = {name: 'Herve', age: 25};
var {name} = user;
console.log(name);
*/

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (error, db) => {
  if(error){
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  //Create DB collection.
  /*db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false
  }, (error, result) => {
    if(error){
      return console.log('Error inserting data.', error);
    }

    console.log(JSON.stringify(result.ops, undefined, 2));

  });

  db.collection('Users').insertOne({
    //_id: 1,
    name: 'su',
    age: 25,
    location: 'Pretoria ZA'
  }, (error, result) => {
    if(error){
      return console.log('Error inserting data.', error);
    }
    //result.ops is an array of all inserted objects.
    console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));

  });*/

  //Close DB connection
  db.close();
});
