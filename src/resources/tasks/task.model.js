const uuid = require('uuid');
class TaskModel {
  constructor({
    title = 'task title',
    order = 0,
    description = 'task description',
    userId = '0',
    boadrdId = '0',
    columnId = '0'
  } = {}) {
    this.id = uuid();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boadrdId = boadrdId;
    this.columnId = columnId;
  }
}

module.exports = TaskModel;
