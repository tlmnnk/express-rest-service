const boardRepo = require('../boards/board.memory.repository');
const { deleteByBoardId } = require('../tasks/task.service');

const getAll = () => boardRepo.getAll();

const getBoard = id => boardRepo.getBoard(id);

const createBoard = board => boardRepo.createBoard(board);

const updateBoard = (id, body) => boardRepo.updateBoard(id, body);

const deleteBoard = async id => {
  const deletedCount = await boardRepo.deleteBoard(id);
  deletedCount && (await deleteByBoardId(id));
  return deletedCount;
};

module.exports = {
  getAll,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
};
