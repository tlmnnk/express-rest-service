const db = require('../../db');

const getAll = async boardId => {
  return new Promise(resolve => {
    setTimeout(() => {
      boardId && resolve(db.tasks.filter(task => task.boardId === boardId));
      !boardId && resolve(db.tasks);
    }, 300);
  });
};

const getTask = async (boardId, taskId) => {
  const tasksData = await getAll(boardId);
  const task = tasksData.find(item => item.id === taskId);
  return task;
};

const addTask = async (boardId, body) => {
  const tasksData = await getAll();
  const newTask = { ...body, boardId };
  db.tasks = [...tasksData, newTask];

  return newTask;
};

const updateTask = async (boardId, taskId, body) => {
  const taskIndex = db.tasks.findIndex(
    item => item.boardId === boardId && item.id === taskId
  );
  const task = { ...body, boardId };
  if (taskIndex !== -1) {
    db.tasks = [
      ...db.tasks.splice(0, taskIndex),
      task,
      ...db.tasks.splice(taskIndex)
    ];
    return task;
  }
  return null;
};

const deleteTask = async (boardId, taskId) => {
  const tasksData = await getAll();

  const taskIndex = tasksData.findIndex(
    item => item.boardId === boardId && item.id === taskId
  );
  if (taskIndex !== -1) {
    db.tasks = [
      ...tasksData.splice(0, taskIndex),
      ...tasksData.splice(taskIndex)
    ];
    return tasksData[taskIndex];
  }
  return null;
};

module.exports = {
  getAll,
  getTask,
  addTask,
  updateTask,
  deleteTask
};
