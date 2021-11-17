import getFeedback from './utils-feedback/getFeedback.js';

window.addEventListener('DOMContentLoaded', getFeedback);

// comment form
const commentForm = document.querySelector('.comment-form');
const commentInput = document.querySelector('.comment-input');
const charLeft = document.querySelector('.characters-left');

const params = window.location.search;
const id = new URLSearchParams(params).get('id');

commentForm.addEventListener('submit', postComment);
commentInput.addEventListener('keyup', toggleCharLeft);

function toggleCharLeft(e) {
  const num = e.target.value.length;
  charLeft.textContent = `${250 - num} Characters left`;
}

async function postComment(e) {
  e.preventDefault();
  const content = commentInput.value;

  if (!content) {
    errorHandler();
    return;
  }

  try {
    const { data } = await axios.post(`/api/v1/feedbacks/comments/${id}`, {
      content,
      user: {
        image: '../assets/user-images/image-zena.jpg',
        name: 'Zena Kelley',
        username: 'velvetround',
      },
    });
    console.log(data);

    if (data.success === 'created') {
      getFeedback();
      commentInput.value = '';
    }
  } catch (error) {
    console.log(error);
  }
  // create a new comment with back end POST
}

function errorHandler() {
  console.log('hello');
  commentInput.style.borderColor = 'red';
  const error = document.createElement('span');
  error.innerHTML = `Can't be empty`;
  error.className = 'error-message';
  commentInput.parentElement.appendChild(error);

  setTimeout(() => {
    commentInput.style.borderColor = 'transparent';
    error.remove();
  }, 3000);
}
