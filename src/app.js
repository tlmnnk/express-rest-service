const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');
const logger = require('./utils/logger');
const { finished } = require('stream');
const helmet = require('helmet');
const checkAuth = require('./utils/checkAuth');

const {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  getStatusText
} = require('http-status-codes');

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(helmet());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use((req, res, next) => {
  const { method, url, query, body } = req;
  const start = Date.now();

  // eslint-disable-next-line callback-return
  next();

  finished(res, () => {
    const { statusCode } = res;
    const ms = Date.now() - start;
    if (
      (url.includes('users') && ['PUT', 'POST'].includes(method)) ||
      url.includes('login')
    ) {
      delete body.password;
    }
    logger.info(
      `${method} ${statusCode} ${url} ${JSON.stringify(query)} ${JSON.stringify(
        body
      )} - ${ms} ms`
    );
  });
});

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);

app.use('/users', checkAuth, userRouter);

app.use('/boards', checkAuth, boardRouter);

app.use('/boards', checkAuth, taskRouter);

app.use((req, res, next) => {
  res.status(NOT_FOUND).send(getStatusText(NOT_FOUND));
  next();
});

app.use((err, req, res, next) => {
  if (err) {
    logger.error(err.stack);
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(getStatusText(INTERNAL_SERVER_ERROR));
  }
  next();
});

// Uncomment to test uncaughtException and uncaughtRejection handling
// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

module.exports = app;
