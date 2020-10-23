const TaskModel = require('../tasks/task.model');

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

const deleteTask = async (boardId, taskId) => {
  return (await TaskModel.deleteOne({ _id: taskId, boardId })).deletedCount;
};

module.exports = {
  getAll,
  getTask,
  addTask,
  updateTask,
  deleteTask
};
