const router = require('express').Router();
const { signToken } = require('./login.service');

router.post('/', async (req, res) => {
  const { login, password } = req.body;
  const token = await signToken(login, password);

  if (!token) {
    res.sendStatus(403).send('Wrong login/password');
  } else {
    res.status(200).json(token);
  }
});

module.exports = router;
