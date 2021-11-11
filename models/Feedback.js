const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide company name'],
  },
  category: {
    type: String,
    required: [true, 'Please provide category name'],
    enum: ['ui', 'ux', 'enhancement', 'bug', 'feature'],
  },
  upvotes: {
    type: Number,
    default: 0,
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
