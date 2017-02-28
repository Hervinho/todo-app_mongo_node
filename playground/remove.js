const {ObjectID} = require('mongodb'); //get ObjectID from mongodb library
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

/*
Todo.remove({}).then((result) => {
  console.log(result);
});


Todo.findByIdAndRemove('58b54cdf4b2dd927b8c9e7c2').then((todo) => {
  console.log(todo);
});
*/

Todo.findOneAndRemove('58b54cdf4b2dd927b8c9e7c2').then((result) => {
  console.log(result);
});
