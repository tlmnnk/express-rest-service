const { OK, NOT_FOUND } = require('http-status-codes');
const boardSerivce = require('./board.service');
const { toResponseBoard } = require('./board.model');

const router = require('express').Router();

router.route('/').get(async (req, res) => {
  const boards = await boardSerivce.getAll();

  res.status(OK).json(boards.map(toResponseBoard));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const board = await boardSerivce.getBoard(id);
  if (board) {
    res.status(OK).json(toResponseBoard(board));
  } else {
    res.status(NOT_FOUND).json({
      message: 'Board not found'
    });
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardSerivce.createBoard(req.body);

  res.status(OK).json(toResponseBoard(board));
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const board = await boardSerivce.updateBoard(id, req.body);

  if (board) {
    res.status(OK).json(toResponseBoard(board));
  } else {
    res.status(NOT_FOUND).json({
      message: 'Board not found'
    });
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const deletedCount = await boardSerivce.deleteBoard(id);
  if (deletedCount) {
    res.sendStatus(OK);
  } else {
    res.status(NOT_FOUND).json({
      message: 'something went wrong'
    });
  }
});

module.exports = router;
