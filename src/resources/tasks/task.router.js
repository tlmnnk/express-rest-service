const router = require('express').Router();
const TaskModel = require('./task.model');
const taskService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await taskService.getAll(req.params.boardId);

  res.json(tasks);
});

router.route('/:boardId/tasks/:taskId/').get(async (req, res) => {
  const { boardId, taskId } = req.params;
  const task = await taskService.getTask(boardId, taskId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({
      message: 'task not found'
    });
  }
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const task = await taskService.addTask(
    req.params.boardId,
    new TaskModel(req.body)
  );

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({
      message: 'Something went wrong'
    });
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const { boardId, taskId } = req.params;
  const updated = await taskService.updateTask(boardId, taskId, req.body);

  if (updated) {
    res.json(updated);
  } else {
    res.json({
      message: 'Task not found'
    });
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const { boardId, taskId } = req.params;
  const deletedTask = taskService.deleteTask(boardId, taskId);

  if (deletedTask) {
    res.sendStatus(200);
  } else {
    res.status(404).json({
      message: 'Task not found'
    });
  }
});

module.exports = router;
