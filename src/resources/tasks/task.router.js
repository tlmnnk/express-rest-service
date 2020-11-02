const router = require('express').Router();
const { OK, NOT_FOUND } = require('http-status-codes');
const taskService = require('./task.service');
const { taskToResponse } = require('./task.model');

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await taskService.getAll(req.params.boardId);

  res.status(OK).json(tasks.map(taskToResponse));
});

router.route('/:boardId/tasks/:taskId/').get(async (req, res) => {
  const { boardId, taskId } = req.params;
  const task = await taskService.getTask(boardId.toString(), taskId.toString());

  if (task) {
    res.status(OK).json(taskToResponse(task));
  } else {
    res.status(NOT_FOUND).json({
      message: 'task not found'
    });
  }
});

router.route('/:boardId/tasks').post(async (req, res) => {
  console.log('boardId', req.params.boardId);
  const task = await taskService.addTask(req.params.boardId, req.body);

  if (task) {
    res.status(OK).json(taskToResponse(task));
  } else {
    res.status(NOT_FOUND).json({
      message: 'Something went wrong'
    });
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const { boardId, taskId } = req.params;
  const updated = await taskService.updateTask(boardId, taskId, req.body);
  if (updated) {
    res.status(OK).json(taskToResponse(updated));
  } else {
    res.status(NOT_FOUND).json({
      message: 'Task not found'
    });
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const { boardId, taskId } = req.params;
  const deletedCount = await taskService.deleteTask(boardId, taskId);

  if (deletedCount) {
    res.sendStatus(OK);
  } else {
    res.status(NOT_FOUND).json({
      message: 'Task not found'
    });
  }
});

module.exports = router;
