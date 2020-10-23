const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const logger = require('../utils/logger');

const connectToDB = cb => {
  logger.info('Connecting to DB...');
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  const db = mongoose.connection;
  db.on('error', () => {
    logger.error('Database error...');
  });

  db.once('open', () => {
    logger.info('Successfully connected to DB');
  });
  cb();
};

module.exports = {
  connectToDB
};
