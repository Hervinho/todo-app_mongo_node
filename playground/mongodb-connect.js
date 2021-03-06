// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  //using cursors to stream data instead of consuming everything at once.
  var query = {'details.time': '10.00 am'};
  var cursor = db.collection('Todos').find(query);

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

  //find all
  /*db.collection('Todos').find({
     //_id: new ObjectID('57bb36afb3b6a3801d8c479d'), completed: false
     //text: {$regex: /^hello/} //using regex operator
     //'details.time': '10.00 am'
     //writers: ["You", "Jane Doe", "Aliens"]//exact match in the array
     //writers: "Jane Doe" //anything that matches (even partially)
     //"writers.0": "You" //only matching with first element of the array
     //writers: {$in: ["Me", "Aliens"]}
     //duration: {$gt: 50, $lte: 150} // $lt = <, $lte: <= . > 50 and < 150
     //"details.time": {$exists: false} //check if that field exists/true or notfalse
     //$or: [{"details.time": {$exists: false}}, {duration: {$gt: 50, $lte: 150}}] //OR operator
     //$and: [{"details.time": {$exists: false}}, {duration: {$eq: 10}}]
     writers: {$size: 3} //match with array size
  }).toArray().then((docs) => {
     console.log('Todos');
     console.log(JSON.stringify(docs, undefined, 2));
   }, (err) => {
     console.log('Unable to fetch todos', err);
  });*/

  //find all and count.
  /*db.collection('Todos').find().count().then((count) => {
     console.log(`Todos count: ${count}`);
   }, (err) => {
     console.log('Unable to fetch todos', err);
  });*/

  //insert one. 
  /*db.collection('Todos').insertOne({
    text: 'play',
    completed: true,
    //details: {date: '22/09/1993', time: '11.00 pm'},
    writers: ["You", "Jane Doe", "Aliens"]
   }, (err, result) => {
     if (err) {
      return console.log('Unable to insert todo', err);
    }
  
     console.log(JSON.stringify(result.ops, undefined, 2));
  });*/


  //Insert many
  /*db.collection('Todos').insertMany([
    {
     text: 'bath',
     completed: false,
     duration: 15
    },
    {
     text: 'dress up',
     completed: false,
     duration: 10
    },
    {
     text: 'gym',
     completed: false,
     duration: 100
    }
  ], (err, result) => {
     if (err) {
       return console.log('Unable to insert todo', err);
    }
  
     console.log('Inserted');
   });*/

  //find one and update
  /*db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5980563bb3acd90be0da2ebf')
  }, {
    $set: {
      text: 'Second bath of the day'
    },
    $inc: {
      duration: 10
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });*/

  db.close();
});
