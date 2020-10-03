const mockService = require('../../service/mock.service');

const getAll = async () => {
  const allUsers = await mockService.getAllUsers();
  return allUsers;
};

module.exports = { getAll };
