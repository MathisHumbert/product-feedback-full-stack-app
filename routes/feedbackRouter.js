const express = require('express');
const router = express.Router();

const {
  getAllFeedback,
  getSingleFeedback,
  createFeedback,
  editFeedback,
  deleteAllFeedback,
  getComments,
  toggleUpvoted,
} = require('../controllers/feedbackControllers');

router.route('/').get(getAllFeedback).post(createFeedback);
router
  .route('/:id')
  .get(getSingleFeedback)
  .patch(editFeedback)
  .delete(deleteAllFeedback);

router.route('/comments/:id').get(getComments);
router.post('/upvoted', toggleUpvoted);

module.exports = router;
