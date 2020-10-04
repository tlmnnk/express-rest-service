const data = require('../../data');

const boards = [...data.boards];

const getAll = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(boards);
    }, 300);
  });
};

module.exports = {
  getAll
};
