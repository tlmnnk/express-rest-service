const db = require('../../db');

const getAll = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(db.boards);
    }, 300);
  });
};

const getBoard = async id => {
  const board = db.boards.find(item => item.id === id);

  return board;
};

const createBoard = async board => {
  db.boards = [...db.boards, board];
  return board;
};

const updateBoard = async (id, body) => {
  const newBoards = db.boards.filter(item => item.id !== id);

  db.boards = [...newBoards, body];

  return body;
};

const deleteBoard = async id => {
  const board = db.boards.find(item => item.id === id);
  const newBoards = db.boards.filter(item => item.id !== id);
  db.deleteBoardTasks(id);
  db.boards = [...newBoards];
  return board;
};

module.exports = {
  getAll,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
};
