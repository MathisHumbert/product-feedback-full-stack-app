const Feedback = require('../models/Feedback');
const { StatusCodes } = require('http-status-codes');
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
  console.log(req.body);

  res.send('create feedback');
};

const editFeedback = async (req, res) => {
  res.send('edit feedback');
};
const deleteAllFeedback = async (req, res) => {
  res.send('delete feedback');
};

module.exports = {
  getAllFeedback,
  getSingleFeedback,
  createFeedback,
  editFeedback,
  deleteAllFeedback,
};
