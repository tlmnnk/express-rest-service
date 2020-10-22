const router = require('express').Router();
const { OK, NOT_FOUND } = require('http-status-codes');
const { toResponse } = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();

  res.status(OK).json(users.map(toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getById(id);
  if (!user) {
    res.status(NOT_FOUND).json({
      message: 'User not found'
    });
  } else {
    res.status(OK).json(toResponse(user));
  }
});

router.route('/').post(async (req, res) => {
  const user = await usersService.addUser(req.body);
  if (user) {
    res.status(OK).json(toResponse(user));
  } else {
    res.status(NOT_FOUND).json({
      message: 'Error. User not found'
    });
  }
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.updateUser(req.params.id, req.body);
  if (user) {
    res.status(OK).json(toResponse(user));
  } else {
    res.status(NOT_FOUND).json({
      message: 'User not found'
    });
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const deletedUser = await usersService.deleteUser(id);
  if (deletedUser) {
    res.status(OK).json(toResponse(deletedUser));
  } else {
    res.status(NOT_FOUND).json({
      message: 'User not found'
    });
  }
});

module.exports = router;
