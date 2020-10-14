const { createLogger, format, transports } = require('winston');
const morgan = require('morgan');
const { combine, printf } = format;

morgan.token('query', req => JSON.stringify(req.query));
morgan.token('body', req => JSON.stringify(req.body));

const myFormat = printf(({ message, timestamp }) => {
  return `[${timestamp}]  ${message}`;
});

const logger = createLogger({
  format: combine(format.timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'combined.log' })
  ],
  exceptionHandlers: [new transports.File({ filename: 'exceptions.log' })],
  rejectionHandlers: [new transports.File({ filename: 'rejections.log' })],
  exitOnError: false
});

logger.stream = {
  write: message => logger.info(message)
};

module.exports = logger;
