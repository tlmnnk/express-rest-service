const data = require('../data');

class DB {
  constructor({ users = [], boards = [], tasks = [] }) {
    this.users = users;
    this.boards = boards;
    this.tasks = tasks;
  }

  unassignTasks(id) {
    this.tasks = this.tasks.map(item => {
      if (item.userId === id) {
        return {
          ...item,
          userId: null
        };
      }
      return item;
    });
    // console.log(this.tasks);
  }

  deleteBoardTasks(boardId) {
    this.tasks = this.tasks.filter(item => item.boardId !== boardId);
  }
}

const db = new DB(data);

module.exports = db;
