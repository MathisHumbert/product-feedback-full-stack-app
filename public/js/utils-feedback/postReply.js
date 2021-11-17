import getFeedback from './getFeedback.js';
const params = window.location.search;
const id = new URLSearchParams(params).get('id');

async function postReply(e, replyInput) {
  e.preventDefault();

  let targetNum = '';
  const content = e.target.children[0].children[0].value;
  const replyingTo =
    e.target.parentElement.children[0].children[0].children[1].children[1].textContent.split(
      '@'
    )[1];
  replyInput.forEach((input) => {
    if (e.target.dataset.id === input.parentElement.parentElement.dataset.id) {
      targetNum = e.target.dataset.id;
    }
  });

  if (content === '') {
    errorHandler(e.target.children[0]);
    return;
  }

  try {
    await axios.post(`/api/v1/feedbacks//replys/${id}`, {
      replyId: targetNum,
      content,
      replyingTo,
      user: {
        image: '../assets/user-images/image-zena.jpg',
        name: 'Zena Kelley',
        username: 'velvetround',
      },
    });
    getFeedback();
  } catch (error) {
    console.log(error);
  }
}

function errorHandler(element) {
  element.children[0].style.borderColor = 'red';
  const error = document.createElement('span');
  error.innerHTML = `Can't be empty`;
  error.className = 'error-message';
  element.parentElement.appendChild(error);

  setTimeout(() => {
    element.children[0].style.borderColor = 'transparent';
    error.remove();
  }, 3000);
}

export default postReply;
