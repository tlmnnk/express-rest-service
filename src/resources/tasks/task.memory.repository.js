const { TaskModel } = require('../tasks/task.model');

const getAll = async boardId => {
  return TaskModel.find({ boardId });
};

const getTask = async (boardId, taskId) => {
  return TaskModel.findOne({ _id: taskId, boardId });
};

const addTask = async (boardId, body) => {
  return TaskModel.create({
    ...body,
    boardId
  });
};

const updateTask = async (boardId, taskId, body) => {
  return TaskModel.findOneAndUpdate(
    { _id: taskId, boardId },
    { $set: body },
    { new: true }
  );
};

const updateMany = async (userId, update) => {
  return TaskModel.updateMany(userId, update);
};

const deleteTask = async (boardId, taskId) => {
  return (await TaskModel.deleteOne({ _id: taskId, boardId })).deletedCount;
};

const deleteByBoardId = async boardId => {
  return TaskModel.deleteMany({ boardId });
};

module.exports = {
  getAll,
  getTask,
  addTask,
  updateTask,
  deleteTask,
  deleteByBoardId,
  updateMany
};
