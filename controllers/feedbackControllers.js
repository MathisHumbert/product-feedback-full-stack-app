const Feedback = require('../models/Feedback');
const CustomError = require('../errors');

const getAllFeedback = async (req, res) => {
  let { sort, filter } = req.headers;

  if (!sort && !filter) {
    const feedbacks = await Feedback.find({}).sort('-upvotes');
    return res.status(200).json({ feedbacks, num: feedbacks.length });
  }

  if (filter === 'all') {
    filter = undefined;
  }

  if (sort === 'Most Upvotes') {
    const feedbacks = await Feedback.find(
      filter === undefined ? {} : { category: filter }
    ).sort('-upvotes');
    return res.status(200).json({ feedbacks, num: feedbacks.length });
  }

  if (sort === 'Least Upvotes') {
    const feedbacks = await Feedback.find(
      filter === undefined ? {} : { category: filter }
    ).sort('upvotes');
    return res.status(200).json({ feedbacks, num: feedbacks.length });
  }

  if (sort === 'Most Comments') {
    let feedbacks = await Feedback.find(
      filter === undefined ? {} : { category: filter }
    );
    feedbacks = feedbacks.sort((a, b) => {
      return b.comments.length - a.comments.length;
    });
    return res.status(200).json({ feedbacks, num: feedbacks.length });
  }

  if (sort === 'Least Comments') {
    let feedbacks = await Feedback.find(
      filter === undefined ? {} : { category: filter }
    );
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
  console.log(title, category, description);

  if (!title || !category || !description) {
    throw new CustomError.BadRequestError(
      'title, category and description fields cannot be empty'
    );
  }

  const feedback = await Feedback.create(req.body);

  res.status(201).json({ success: 'created', feedback });
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

const toggleUpvoted = async (req, res) => {
  const { id } = req.body;
  const feedback = await Feedback.findOne({ _id: id });

  let upvoted = feedback.upvoted;
  let upvotes = feedback.upvotes;

  if (upvoted === false) {
    upvotes++;
  } else {
    upvotes--;
  }

  upvoted = !upvoted;

  const result = await Feedback.findByIdAndUpdate(
    { _id: id },
    { upvoted, upvotes },
    { new: true, runValidators: true }
  );

  res.status(200).json(result);
};

const postComment = async (req, res) => {
  const { content, user } = req.body;

  const feedback = await Feedback.findOne({ _id: req.params.id });

  const comments = feedback.comments;
  const newComment = { id: comments.length + 1, content, user };

  comments.push(newComment);

  const result = await Feedback.findOneAndUpdate(
    { _id: req.params.id },
    { comments: comments },
    { new: true, runValidators: true }
  );

  res.status(200).json({ result, success: 'created' });
};

const postReply = async (req, res) => {
  const { content, user } = req.body;
  const id = req.body.replyId;
  let ids = id.split('');

  const feedback = await Feedback.findOne({ _id: req.params.id });
  let comments = feedback.comments;
  const comment = comments.filter((com) => com.id == ids[0])[0];

  if (!comment.replies) {
    comment.replies = [
      {
        id: `${id}1`,
        content,
        replyingTo: comment.user.username,
        user,
      },
    ];
  } else if (ids.length === 1) {
    comment.replies.push({
      id: `${id}${comment.replies.length + 1}`,
      content,
      replyingTo: comment.user.username,
      user,
    });
  } else {
    ids.splice(0, 1);
    anyReplies(ids, comment.replies, content, user, comments);
  }

  const result = await Feedback.findOneAndUpdate(
    { _id: req.params.id },
    { comments: comments },
    { new: true, runValidators: true }
  );

  res.status(200).json({ result, success: 'created' });
};

async function anyReplies(ids, replies, content, user, comments) {
  const reply = replies[ids[0] - 1];

  console.log(reply);

  if (!reply.replies) {
    reply.replies = [
      {
        id: `${reply.id}1`,
        content,
        replyingTo: reply.user.username,
        user,
      },
    ];
  } else if (ids.length === 1) {
    reply.replies.push({
      id: `${reply.id}${reply.replies.length + 1}`,
      content,
      replyingTo: reply.user.username,
      user,
    });
  } else {
    ids.splice(0, 1);
    return anyReplies(ids, reply.replies, content, user, comments);
  }
}

module.exports = {
  getAllFeedback,
  getSingleFeedback,
  createFeedback,
  editFeedback,
  deleteAllFeedback,
  toggleUpvoted,
  postComment,
  postReply,
};
