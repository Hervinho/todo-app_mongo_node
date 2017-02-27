var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {user} = require('./models/user');

var app = express();
app.use(bodyParser.json());

const port = /*process.env.PORT ||*/ 3000;

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

app.get('/todos', (req, res) => {
  //get all todos
  Todo.find().then((todos) => {
    res.send({todos});
  }, (error) => {
    res.status(400).send(error);
  })

});

app.listen(port, () => {
  console.log('Server listening to port ' + port);
});

//Everything in this file will be needed in server.test.js
module.exports = {app};
