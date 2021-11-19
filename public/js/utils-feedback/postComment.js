import getFeedback from './getFeedback.js';

const params = window.location.search;
const id = new URLSearchParams(params).get('id');

const commentInput = document.querySelector('.comment-input');
const charLeft = document.querySelector('.characters-left');

async function postComment(e) {
  e.preventDefault();
  const content = commentInput.value;

  if (!content) {
    errorHandler();
    return;
  }

  try {
    await fetch(`/api/v1/feedbacks/comments/${id}`, {
      method: 'POST',
      body: JSON.stringify({
        content,
        user: {
          image: '../assets/user-images/image-zena.jpg',
          name: 'Zena Kelley',
          username: 'velvetround',
        },
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });

    getFeedback();
    commentInput.value = '';
    charLeft.textContent = `250 Characters left`;
  } catch (error) {
    console.log(error);
  }
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

export default postComment;
