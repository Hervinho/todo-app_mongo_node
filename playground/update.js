//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');//ObjectID helps create new object id's

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (error, db) => {
  if(error){
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  //findOneAndUpdate
  /*db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('58aeb73e8acc9d6bf480a0ac')
    }, {
      $set: {
        completed: false
      }
    }, {
      returnOriginal: false //will return the updated object.
    }).then((result) => {
      console.log(result);
    }, (err) => {
      console.log('Unable to find and update Todo', err);
    });*/

    db.collection('Users').findOneAndUpdate({
      _id: new ObjectID('58ad87a41cd97b29e4f909df')
      }, {
        $set: {
          name: 'Herve'
        },
        $inc: {
          age: 10
        }
      }, {
        returnOriginal: false //will return the updated object.
      }).then((result) => {
        console.log(result);
      }, (err) => {
        console.log('Unable to find and update Todo', err);
      });

  //Close DB connection
  //db.close();
});
