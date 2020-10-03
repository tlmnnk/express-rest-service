const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const addUser = user => usersRepo.addUser(user);

const updateUser = (id, body) => usersRepo.updatedUser(id, body);

const deleteUser = id => usersRepo.deleteUser(id);

module.exports = {
  getAll,
  addUser,
  updateUser,
  deleteUser
};
