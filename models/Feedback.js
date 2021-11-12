const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide company name'],
  },
  category: {
    type: String,
    required: [true, 'Please provide category name'],
    enum: ['UI', 'UX', 'enhancement', 'bug', 'feature'],
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['planned', 'in-progress', 'live', 'suggestion'],
    required: [true, 'Please provide status name'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  comments: {
    type: Array,
  },
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
