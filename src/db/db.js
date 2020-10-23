const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const logger = require('../utils/logger');
// const User = require('../resources/users/user.model');

// class DB {
//   constructor({ users = [], boards = [], tasks = [] }) {
//     this.users = users;
//     this.boards = boards;
//     this.tasks = tasks;
//   }

//   unassignTasks(id) {
//     this.tasks = this.tasks.map(item => {
//       if (item.userId === id) {
//         return {
//           ...item,
//           userId: null
//         };
//       }
//       return item;
//     });
//     // console.log(this.tasks);
//   }

//   deleteBoardTasks(boardId) {
//     this.tasks = this.tasks.filter(item => item.boardId !== boardId);
//   }
// }

// const db = new DB(data);

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
