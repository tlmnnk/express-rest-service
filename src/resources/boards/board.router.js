const boardSerivce = require('./board.service');

const router = require('express').Router();

router.route('/').get(async (req, res) => {
  const boards = await boardSerivce.getAll();

  res.json(boards);
});

module.exports = router;
