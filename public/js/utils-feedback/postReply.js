import getFeedback from './getFeedback.js';
const params = window.location.search;
const id = new URLSearchParams(params).get('id');

async function postReply(e, replyInput) {
  e.preventDefault();

  let targetNum = '';
  let content = e.target.children[0].children[0].value;
  replyInput.forEach((input) => {
    if (e.target.dataset.id === input.parentElement.parentElement.dataset.id) {
      targetNum = e.target.dataset.id;
    }
  });

  if (content === '') {
    console.log(e.target.children[0]);
    errorHandler(e.target.children[0]);
    return;
  }

  console.log(targetNum);
  try {
    const { data } = await axios.post(`/api/v1/feedbacks//replys/${id}`, {
      replyId: targetNum,
      content,
      user: {
        image: '../assets/user-images/image-zena.jpg',
        name: 'Zena Kelley',
        username: 'velvetround',
      },
    });
    console.log(data);
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
