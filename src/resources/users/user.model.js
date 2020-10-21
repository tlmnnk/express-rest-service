const mongoose = require('mongoose');
const uuid = require('uuid');

const userSchema = new mongoose.Schema({
  name: String,
  login: String,
  password: String,
  _id: {
    type: String,
    default: uuid
  }
});

const User = mongoose.model('User', userSchema);

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

module.exports = User;
