import getFeedback from './utils-feedback/getFeedback.js';
import postComment from './utils-feedback/postComment.js';

const commentForm = document.querySelector('.comment-form');
const commentInput = document.querySelector('.comment-input');
const charLeft = document.querySelector('.characters-left');

window.addEventListener('DOMContentLoaded', getFeedback);

commentForm.addEventListener('submit', postComment);
commentInput.addEventListener('keyup', toggleCharLeft);

function toggleCharLeft(e) {
  const num = e.target.value.length;
  charLeft.textContent = `${250 - num} Characters left`;
}
