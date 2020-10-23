const uuid = require('uuid');
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: String,
  columns: Array,
  _id: {
    type: String,
    default: uuid
  }
});

const BoardModel = mongoose.model('boards', boardSchema);

const toResponseBoard = board => {
  const { _id, title, columns } = board;
  return { id: _id, title, columns };
};

module.exports = {
  BoardModel,
  toResponseBoard
};
