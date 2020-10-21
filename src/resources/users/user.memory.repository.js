const User = require('../users/user.model');

const getAll = async () => {
  return await User.find({});
};

const getById = async id => {
  return User.findOne({ _id: id });
};

const addUser = async user => {
  return User.create(user);
};

const updatedUser = async (id, body) => {
  return User.updateOne({ _id: id }, body);
};

const deleteUser = async id => {
  return (await User.deleteOne({ _id: id })).deletedCount;
};

module.exports = {
  getAll,
  getById,
  addUser,
  updatedUser,
  deleteUser
};
