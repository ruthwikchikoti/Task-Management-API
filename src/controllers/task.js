const Task = require('../models/task.js');
const AppError = require('../utils/appError.js');

exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.user.id
    });

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const { status, priority, sortBy = 'createdAt', order = 'desc' } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    let query = { userId: req.user.id };
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const tasks = await Task.find(query)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit);

    const total = await Task.countDocuments(query);

    res.status(200).json({
      success: true,
      data: tasks,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

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
