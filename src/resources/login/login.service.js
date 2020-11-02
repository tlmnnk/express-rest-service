const userRepo = require('../users/user.memory.repository');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const { checkHashedPassword } = require('../../utils/hashHelper');

const signToken = async (userLogin, password) => {
  const user = await userRepo.getByLogin(userLogin);

  if (!user) {
    return null;
  }
  const { password: hashedPassword } = user;

  const comparison = await checkHashedPassword(password, hashedPassword);
  if (comparison) {
    const { _id, login } = user;
    const token = jwt.sign({ _id, login }, JWT_SECRET_KEY);
    return token;
  }
  return null;
};

module.exports = {
  signToken
};
