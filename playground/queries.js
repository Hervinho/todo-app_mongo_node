const {ObjectID} = require('mongodb'); //get ObjectID from mongodb library
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '58b406a3cb693437341cefaf', userId = '58aed049b635da2388838565';
//Check if id is valid
if( !ObjectID.isValid(userId) ){
  console.log('Id not valid');
}

//Find by Id
/*Todo.findById(id).then((todo) => {
  if(!todo){
    return console.log('Id not found', todo);
  }
    console.log('Todo by Id', todo);
}).catch((err) => {
  console.log(err);
});
*/

User.findById(userId).then((user) => {
  if(!user){
    return console.log('Id not found', user);
  }
    console.log('User by Id', user);
}).catch((err) => {
  console.log(err);
});
