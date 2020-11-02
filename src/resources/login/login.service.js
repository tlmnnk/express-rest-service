const userRepo = require('../users/user.memory.repository');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

const signToken = (userLogin, password) => {
  const user = userRepo.getByAuth(userLogin, password);

  if (user) {
    const { id, login } = user;
    const token = jwt.sign({ id, login }, JWT_SECRET_KEY);
    return token;
  }
  return null;
};

module.exports = {
  signToken
};
