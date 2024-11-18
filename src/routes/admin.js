const express = require('express');
const { getAllUsers, deleteAnyTask } = require('../controllers/admin.js');
const { protect, restrictTo } = require('../middleware/auth.js');

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

router.get('/users', getAllUsers);
router.delete('/tasks/:id', deleteAnyTask);

module.exports = router;