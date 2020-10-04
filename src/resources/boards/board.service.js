const boardRepo = require('../boards/board.memory.repository');

const getAll = () => boardRepo.getAll();

const getBoard = id => boardRepo.getBoard(id);

const createBoard = board => boardRepo.createBoard(board);

const updateBoard = (id, body) => boardRepo.updateBoard(id, body);

const deleteBoard = id => boardRepo.deleteBoard(id);

module.exports = {
  getAll,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
};
