const User = require('../models/user.js');
const Task = require('../models/task.js');
const AppError = require('../utils/appError.js');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteAnyTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
      throw new AppError('Task not found', 404);
    }

    res.status(200).json({
      success: true,
      data: null
    });
  } catch (error) {
    next(error);
  }
};