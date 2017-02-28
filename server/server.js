const {ObjectID} = require('mongodb'); //get ObjectID from mongodb library
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {user} = require('./models/user');

var app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

//create todo
app.post('/todos', (req, res) => {
  //Create Todo model.
  var todo = new Todo({
    text: req.body.text
  });

  //Save into the DB
  todo.save().then((doc) => {
    res.send(doc);
  }, (error) => {
    res.status(400).send(error);
  });

});

//get all todos
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (error) => {
    res.status(400).send(error);
  })

});

//get a single todo
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if( !ObjectID.isValid(id) ){
    res.status(400).send({response: 'Id not valid'});
  }
  else{
    Todo.findById(id).then((todo) => {
      if(!todo){
        res.status(404).send({response: 'Todo not found'});
      }
      res.status(200).send({todo});
    }, (error) => {
      res.status(400).send(error);
    });
  }
});

//delete a single todo
app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if( !ObjectID.isValid(id) ){
    res.status(400).send({response: 'Id not valid'});
  }
  else{
    Todo.findByIdAndRemove(id).then((todo) => {
      if(!todo){
        res.status(404).send({response: 'Todo not found'});
      }
      else{
        res.status(200).send({todo});
      }
    }, (error) => {
      res.status(400).send(error);
    });
  }
});

app.listen(port, () => {
  console.log('Server listening to port ' + port);
});

//Everything in this file will be needed in server.test.js
module.exports = {app};
