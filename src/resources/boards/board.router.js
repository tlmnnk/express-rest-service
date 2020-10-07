const BoardModel = require('./board.model');
const boardSerivce = require('./board.service');

const router = require('express').Router();

router.route('/').get(async (req, res) => {
  const boards = await boardSerivce.getAll();

  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const board = await boardSerivce.getBoard(id);
  if (board) {
    res.json(board);
  } else {
    res.status(404).json({
      message: 'Board not found'
    });
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardSerivce.createBoard(new BoardModel(req.body));

  res.json(board);
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const board = await boardSerivce.updateBoard(id, req.body);

  if (board) {
    res.json(board);
  } else {
    res.json({
      message: 'Board not found'
    });
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const board = await boardSerivce.deleteBoard(id);

  if (board) {
    res.sendStatus(200);
  } else {
    res.status(404).json({
      message: 'something went wrong'
    });
  }
});

module.exports = router;
