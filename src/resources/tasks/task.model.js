const uuid = require('uuid');
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: String,
  order: Number,
  description: String,
  userId: String,
  boardId: String,
  columnId: String,
  _id: {
    type: String,
    default: uuid
  }
});

const TaskModel = mongoose.model('Task', TaskSchema);

const taskToResponse = task => {
  const { _id, order, description, userId, boardId, columnId, title } = task;
  return {
    id: _id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  };
};

module.exports = {
  TaskModel,
  taskToResponse
};
