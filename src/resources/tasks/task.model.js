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

module.exports = TaskModel;
