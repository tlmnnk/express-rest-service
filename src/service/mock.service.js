const data = require('../data');

const getAllUsers = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data.users);
    }, 300);
  });
};

module.exports = {
  getAllUsers
};
