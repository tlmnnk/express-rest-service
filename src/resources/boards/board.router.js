const BoardModel = require('./board.model');
const boardSerivce = require('./board.service');

const router = require('express').Router();

router.route('/').get(async (req, res) => {
  const boards = await boardSerivce.getAll();

  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const board = await boardSerivce.getBoard(id);
  res.json(board);
});

router.route('/').post(async (req, res) => {
  const board = await boardSerivce.createBoard(new BoardModel(req.body));

  res.json({
    message: 'New Board created',
    body: board
  });
});

router.route('/:id').put(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const board = await boardSerivce.updateBoard(id, req.body);

  res.json({
    message: 'Board was updated',
    body: board
  });
});

router.route('/:id').delete(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const board = await boardSerivce.deleteBoard(id);

  res.json({
    message: 'Board was deleted',
    body: board
  });
});

module.exports = router;
