const usersRepo = require('./user.memory.repository');
const { updateMany } = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const addUser = user => usersRepo.addUser(user);

const updateUser = (id, body) => usersRepo.updatedUser(id, body);

const deleteUser = async id => {
  const deletedCount = await usersRepo.deleteUser(id);
  if (deletedCount) await updateMany({ userId: id }, { userId: null });
  return deletedCount;
};

module.exports = {
  getAll,
  getById,
  addUser,
  updateUser,
  deleteUser
};
