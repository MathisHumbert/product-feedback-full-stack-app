import getFeedback from './getFeedback.js';

const params = window.location.search;
const id = new URLSearchParams(params).get('id');

const commentInput = document.querySelector('.comment-input');

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
