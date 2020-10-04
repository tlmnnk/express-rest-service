const boardRepo = require('../boards/board.memory.repository');

const getAll = () => boardRepo.getAll();

module.exports = {
  getAll
};
