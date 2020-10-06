const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();

  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const users = await usersService.getAll();
  const { id } = req.params;
  console.log(req.params);
  const user = users.find(item => item.id === id);
  if (!user) {
    res.status(404).json({
      message: 'User not found'
    });
  } else {
    res.json(User.toResponse(user));
  }
});

router.route('/').post(async (req, res) => {
  const user = await usersService.addUser(new User(req.body));
  res.set('content-type', 'application/json');
  res.json({
    message: 'New User created',
    body: user
  });
});

router.route('/:id').put(async (req, res) => {
  const id = parseInt(req.params.id, 10);

  const user = await usersService.updateUser(id, req.body);
  if (user) {
    res.json({
      message: 'User was updated',
      body: User.toResponse(user)
    });
  } else {
    res.json({
      message: 'User not found'
    });
  }
});

router.route('/:id').delete(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const deletedUser = await usersService.deleteUser(id);
  if (deletedUser) {
    res.json({
      message: 'User was deleted',
      body: User.toResponse(deletedUser)
    });
  } else {
    res.json({
      message: 'User not found'
    });
  }
});

module.exports = router;
