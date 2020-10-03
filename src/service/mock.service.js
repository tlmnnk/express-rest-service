const data = require('../data');

const getAllUsers = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data.users);
    }, 300);
  });
};

const addUser = user => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(user);
    }, 300);
  });
};

module.exports = {
  getAllUsers,
  addUser
};
