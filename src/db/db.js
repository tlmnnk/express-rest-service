// const data = require('../data');
const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');

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
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', e => {
    throw e;
  });

  db.once('open', () => {
    console.log('Connected to DB');
  });
  cb();
};

module.exports = {
  connectToDB
};
