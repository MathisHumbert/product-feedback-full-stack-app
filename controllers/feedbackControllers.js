const Feedback = require('../models/Feedback');

const CustomError = require('../errors');

const getAllFeedback = async (req, res) => {
  const feedbacks = await Feedback.find({});
  res.status(200).json({ feedbacks, num: feedbacks.length });
};

const getSingleFeedback = async (req, res) => {
  const feedback = await Feedback.findOne({ _id: req.params.id });
  res.status(200).json(feedback);
};

const createFeedback = async (req, res) => {
  const { title, category, description } = req.body;

  if (!title || !category || !description) {
    throw new CustomError.BadRequestError(
      'title, category and description fields cannot be empty'
    );
  }

  const feedback = await Feedback.create(req.body);

  res.status(201).json(feedback);
};

const editFeedback = async (req, res) => {
  const { title, category, description } = req.body;

  if (!title || !category || !description) {
    throw new CustomError.BadRequestError(
      'title, category and description fields cannot be empty'
    );
  }

  const feedback = await Feedback.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json(feedback);
};
const deleteAllFeedback = async (req, res) => {
  const feedback = await Feedback.findOneAndRemove({ _id: req.params.id });
  res.status(200).json('item was removed');
};

module.exports = {
  getAllFeedback,
  getSingleFeedback,
  createFeedback,
  editFeedback,
  deleteAllFeedback,
};
