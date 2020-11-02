const userRepo = require('../users/user.memory.repository');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

const signToken = async (userLogin, password) => {
  const user = await userRepo.getByAuth(userLogin, password);

  if (!user) {
    return null;
  }
  const { _id, login } = user;
  const token = jwt.sign({ _id, login }, JWT_SECRET_KEY);
  return token;
};

module.exports = {
  signToken
};
