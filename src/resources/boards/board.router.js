const { OK, NOT_FOUND } = require('http-status-codes');
const BoardModel = require('./board.model');
const boardSerivce = require('./board.service');

const router = require('express').Router();

router.route('/').get(async (req, res) => {
  const boards = await boardSerivce.getAll();

  res.status(OK).json(boards);
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const board = await boardSerivce.getBoard(id);
  if (board) {
    res.status(OK).json(board);
  } else {
    res.status(NOT_FOUND).json({
      message: 'Board not found'
    });
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardSerivce.createBoard(new BoardModel(req.body));

  res.status(OK).json(board);
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const board = await boardSerivce.updateBoard(id, req.body);

  if (board) {
    res.status(OK).json(board);
  } else {
    res.status(NOT_FOUND).json({
      message: 'Board not found'
    });
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const board = await boardSerivce.deleteBoard(id);

  if (board) {
    res.sendStatus(OK);
  } else {
    res.status(NOT_FOUND).json({
      message: 'something went wrong'
    });
  }
});

module.exports = router;
