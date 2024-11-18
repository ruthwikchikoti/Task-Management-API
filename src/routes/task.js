const express = require('express');
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
} = require('../controllers/task.js');
const { protect } = require('../middleware/auth.js');
const { validateTask } = require('../middleware/validators.js');

const router = express.Router();

router.use(protect); // Protect all routes

router.route('/')
  .get(getTasks)
  .post(validateTask, createTask);

router.route('/:id')
  .get(getTask)
  .put(validateTask, updateTask)
  .delete(deleteTask);

module.exports = router;
