const data = require('../../data');

let boards = [...data.boards];

const getAll = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(boards);
    }, 300);
  });
};

const getBoard = async id => {
  const boardsData = await getAll();
  const board = boardsData.find(item => item.id === id);

  return board;
};

const createBoard = async board => {
  const boardsData = await getAll();

  boards = [...boardsData, board];
  return board;
};

const updateBoard = async (id, body) => {
  const boardsData = await getAll();
  const newBoards = boardsData.filter(item => item.id !== id);

  boards = [...newBoards, body];

  return body;
};

const deleteBoard = async id => {
  const boardsData = await getAll();
  const board = boardsData.find(item => item.id === id);
  const newBoards = boardsData.filter(item => item.id !== id);

  boards = [...newBoards];
  return board;
};

module.exports = {
  getAll,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
};
