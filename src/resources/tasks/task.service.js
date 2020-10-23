const taskRepo = require('./task.memory.repository');

const getAll = boardId => taskRepo.getAll(boardId);

const getTask = (boardId, taskId) => taskRepo.getTask(boardId, taskId);

const addTask = (boardId, body) => taskRepo.addTask(boardId, body);

const updateMany = (userId, update) => taskRepo.updateMany(userId, update);

const updateTask = (boardId, taskId, body) =>
  taskRepo.updateTask(boardId, taskId, body);

const deleteTask = (boardId, taskId) => taskRepo.deleteTask(boardId, taskId);

const deleteByBoardId = boardId => taskRepo.deleteByBoardId(boardId);

module.exports = {
  getAll,
  getTask,
  addTask,
  updateTask,
  deleteTask,
  deleteByBoardId,
  updateMany
};
