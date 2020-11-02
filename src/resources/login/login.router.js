const router = require('express').Router();
const { signToken } = require('./login.service');

router.post('/', (req, res) => {
  const { login, password } = req.body;
  const token = signToken(login, password);

  if (!token) {
    res.sendStatus(403).send('Wrong login/password');
  } else {
    res.status(200).json(token);
  }
});

module.exports = router;
