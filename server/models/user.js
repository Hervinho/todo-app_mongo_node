var mongoose = require('mongoose');

//Create Model with mongoose.
var User = mongoose.model('User', {
  email: {
    type: String,
    minlength: 4,
    required: true,
    trim: true
  }
});

module.exports = {
  User
};
