const { BoardModel } = require('../boards/board.model');

const getAll = () => {
  return BoardModel.find({});
};

const getBoard = async id => {
  return BoardModel.findOne({ _id: id });
};

const createBoard = async board => {
  return BoardModel.create(board);
};

const updateBoard = async (id, body) => {
  return BoardModel.findOneAndUpdate(
    { _id: id },
    { $set: body },
    { new: true }
  );
};

const deleteBoard = async id => {
  return (await BoardModel.deleteOne({ _id: id })).deletedCount;
};

module.exports = {
  getAll,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
};
