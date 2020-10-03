const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();

  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const users = await usersService.getAll();
  const id = parseInt(req.params.id, 10);
  const user = users.find(item => item.id === id);
  res.json(User.toResponse(user));
});

module.exports = router;
