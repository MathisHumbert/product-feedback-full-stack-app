const Feedback = require('../models/Feedback');

const getAllFeedback = async (req, res) => {
  const feedbacks = await Feedback.find({});
  res.status(200).json(feedbacks);
};

const getSingleFeedback = async (req, res) => {
  res.send('get single feedback');
};

const createFeedback = async (req, res) => {
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
