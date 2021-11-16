import getFeedback from './utils-feedback/getFeedback.js';

window.addEventListener('DOMContentLoaded', getFeedback);

const commentForm = document.querySelector('.comment-form');
const commentInput = document.querySelector('.comment-input');
const charLeft = document.querySelector('.characters-left');

commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = commentInput.value;

  if (value) {
    console.log('error');
  }

  // create a new comment with back end POST
});
commentInput.addEventListener('keyup', toggleCharLeft);

function toggleCharLeft(e) {
  const num = e.target.value.length;
  charLeft.textContent = `${250 - num} Characters left`;
}
