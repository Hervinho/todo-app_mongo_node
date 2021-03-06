const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'h@h.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId.toHexString(), access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'g@g.com',
  password: 'userTwoPass'
}];
const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    //var userOne = new User(users[0]).save;
    //var userTwo = new User(users[1]).save;

    return User.insertMany(users);
  }).then(() => done());
};

module.exports = {todos, users, populateTodos, populateUsers};
