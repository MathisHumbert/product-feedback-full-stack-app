const express = require('express');
const router = express.Router();

const {
  getAllFeedback,
  getSingleFeedback,
  createFeedback,
  editFeedback,
  deleteAllFeedback,
  getComments,
} = require('../controllers/feedbackControllers');

router.route('/').get(getAllFeedback).post(createFeedback);
router
  .route('/:id')
  .get(getSingleFeedback)
  .patch(editFeedback)
  .delete(deleteAllFeedback);
router.route('/comments/:id').get(getComments);

module.exports = router;
