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
router
  .route('/:id')
  .get(getSingleFeedback)
  .patch(editFeedback)
  .delete(deleteAllFeedback);

router.post('/upvoted', toggleUpvoted);

router.route('/comments/:id').post(postComment);
router.route('/replys/:id').post(postReply);

module.exports = router;
