const usersRepo = require('./user.memory.repository');
const { updateMany } = require('../tasks/task.service');
const { hashPassword } = require('../../utils/hashHelper');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const addUser = async user => {
  const { password } = user;
  if (!password) {
    return null;
  }

  const hashedPassword = await hashPassword(password);

  return await usersRepo.addUser({
    ...user,
    password: hashedPassword
  });
};

const updateUser = async (id, body) => {
  const { password } = body;
  if (!password) {
    return null;
  }
  const hashedPassword = await hashPassword(password);
  return await usersRepo.updatedUser(id, { ...body, password: hashedPassword });
};

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
