const data = require('../../data');

let tasks = [...data.tasks];

const getAll = async boardId => {
  return new Promise(resolve => {
    setTimeout(() => {
      boardId && resolve(tasks.filter(task => task.boardId === boardId));
      !boardId && resolve(tasks);
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
  tasks = [...tasksData, newTask];

  return newTask;
};

const updateTask = async (boardId, taskId, body) => {
  const tasksData = await getAll();
  const taskIndex = tasksData.findIndex(
    item => item.boardId === boardId && item.id === taskId
  );
  console.log('taskto update', taskIndex);
  if (taskIndex !== -1) {
    const task = { ...body, boardId };
    tasks = [
      ...tasksData.splice(0, taskIndex),
      task,
      ...tasksData.splice(taskIndex)
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
  console.log('tasksData', tasksData);
  if (taskIndex !== -1) {
    tasks = [...tasksData.splice(0, taskIndex), ...tasksData.splice(taskIndex)];
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
