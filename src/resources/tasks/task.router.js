const router = require('express').Router();
const { OK, NOT_FOUND } = require('http-status-codes');
const taskService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await taskService.getAll(req.params.boardId);

  res.status(OK).json(tasks);
});

router.route('/:boardId/tasks/:taskId/').get(async (req, res) => {
  const { boardId, taskId } = req.params;
  const task = await taskService.getTask(boardId, taskId);

  if (task) {
    res.status(OK).json(task);
  } else {
    res.status(NOT_FOUND).json({
      message: 'task not found'
    });
  }
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const task = await taskService.addTask(req.params.boardId, req.body);

  if (task) {
    res.status(OK).json(task);
  } else {
    res.status(NOT_FOUND).json({
      message: 'Something went wrong'
    });
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const { boardId, taskId } = req.params;
  const updated = await taskService.updateTask(boardId, taskId, req.body);
  console.log('updated');
  console.log(updated);
  if (updated) {
    res.status(OK).json(updated);
  } else {
    res.status(NOT_FOUND).json({
      message: 'Task not found'
    });
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const { boardId, taskId } = req.params;
  const deletedTask = taskService.deleteTask(boardId, taskId);

  if (deletedTask) {
    res.sendStatus(OK);
  } else {
    res.status(NOT_FOUND).json({
      message: 'Task not found'
    });
  }
});

module.exports = router;
