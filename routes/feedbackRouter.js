const express = require('express');
const router = express.Router();

const {
  getAllFeedback,
  getSingleFeedback,
  createFeedback,
  editFeedback,
  deleteAllFeedback,
  toggleUpvoted,
  postComment,
  postReply,
} = require('../controllers/feedbackControllers');

router.route('/').get(getAllFeedback).post(createFeedback);

router.patch('/upvoted', toggleUpvoted);

router.route('/comments/:id').post(postComment);
router.route('/replys/:id').post(postReply);

router
  .route('/:id')
  .get(getSingleFeedback)
  .delete(deleteAllFeedback)
  .patch(editFeedback);

module.exports = router;
