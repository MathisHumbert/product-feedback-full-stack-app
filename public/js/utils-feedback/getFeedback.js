import {
  displayAllComments,
  showReply,
} from '../utils-feedback/displayComments.js';
import upvoteHandler from '../utils/upvoteHandler.js';
import createHtmlFeedback from '../utils/createHtmlFeedback.js';

const feedbackContainer = document.querySelector('.single-feedback-container');
const allComments = document.querySelector('.all-comments');
const params = window.location.search;
const id = new URLSearchParams(params).get('id');

const getFeedback = async () => {
  try {
    allComments.innerHTML = '';
    const response = await fetch(`/api/v1/feedbacks/${id}`);
    const data = await response.json();

    feedbackContainer.innerHTML = createHtmlFeedback([data]);
    upvoteHandler(feedbackContainer);

    displayAllComments(data.comments);

    const repliesToggle = allComments.querySelectorAll('.reply-toggle');
    repliesToggle.forEach((reply) =>
      reply.addEventListener('click', showReply)
    );
  } catch (error) {
    console.log(error);
  }
};

export default getFeedback;
