const { createLogger, format, transports } = require('winston');
const { combine, printf } = format;

const myFormat = printf(({ message, timestamp }) => {
  return `[${timestamp}]  ${message}`;
});

const logger = createLogger({
  format: combine(format.timestamp(), myFormat),
  transports: [
    new transports.Console({
      handleExceptions: true
    }),
    new transports.File({
      filename: `logs/combined-${new Date().toLocaleDateString()}.log`,
      handleExceptions: true
    })
  ],
  exceptionHandlers: [
    new transports.File({
      filename: `logs/exceptions-${new Date().toLocaleDateString()}.log`,
      handleExceptions: true
    })
  ],
  rejectionHandlers: [
    new transports.File({
      filename: `logs/rejections-${new Date().toLocaleDateString()}.log`,
      handleExceptions: true
    })
  ],
  handleExceptions: true,
  exitOnError: false
});

logger.stream = {
  write: message => logger.info(message)
};

module.exports = logger;
