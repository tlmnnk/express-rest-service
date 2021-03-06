const { User } = require('../users/user.model');

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
  return User.findOneAndUpdate({ _id: id }, { $set: body }, { new: true });
};

const deleteUser = async id => {
  return (await User.deleteOne({ _id: id })).deletedCount;
};

const getByLogin = async login => {
  return await User.findOne({ login });
};
module.exports = {
  getAll,
  getById,
  addUser,
  updatedUser,
  deleteUser,
  getByLogin
};
