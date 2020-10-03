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

router.route('/').post(async (req, res) => {
  const user = await usersService.addUser(new User(req.body));

  res.json({
    message: 'New User created',
    body: user
  });
});

router.route('/:id').put(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = await usersService.updateUser(id, req.body);

  res.json({
    message: 'User was updated',
    body: User.toResponse(user)
  });
});

router.route('/:id').delete(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const deletedUser = await usersService.deleteUser(id);

  res.json({
    message: 'User was deleted',
    body: User.toResponse(deletedUser)
  });
});

module.exports = router;
