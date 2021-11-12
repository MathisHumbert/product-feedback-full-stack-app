const Feedback = require('../models/Feedback');
const CustomError = require('../errors');
const { db } = require('../models/Feedback');

const getAllFeedback = async (req, res) => {
  const sort = req.headers.sort;

  if (!sort) {
    const feedbacks = await Feedback.find({}).sort('-upvotes');
    return res.status(200).json({ feedbacks, num: feedbacks.length });
  }

  if (sort === 'most upvotes') {
    const feedbacks = await Feedback.find({}).sort('-upvotes');
    return res.status(200).json({ feedbacks, num: feedbacks.length });
  }
  if (sort === 'least upvotes') {
    const feedbacks = await Feedback.find({}).sort('upvotes');
    return res.status(200).json({ feedbacks, num: feedbacks.length });
  }
  if (sort === 'most comments') {
    let feedbacks = await Feedback.find({});
    feedbacks = feedbacks.sort((a, b) => {
      return b.comments.length - a.comments.length;
    });
    return res.status(200).json({ feedbacks, num: feedbacks.length });
  }
  if (sort === 'least comments') {
    let feedbacks = await Feedback.find({});
    feedbacks = feedbacks.sort((a, b) => {
      return a.comments.length - b.comments.length;
    });
    return res.status(200).json({ feedbacks, num: feedbacks.length });
  }
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

const getComments = async (req, res) => {
  const feedback = await Feedback.findOne({ _id: req.params.id }).select(
    'comments'
  );
  console.log(feedback.comments);

  res.status(200).json(feedback.comments);
};

module.exports = {
  getAllFeedback,
  getSingleFeedback,
  createFeedback,
  editFeedback,
  deleteAllFeedback,
  getComments,
};
