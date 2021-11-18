const form = document.querySelector('.create-form');
const titleInput = document.querySelector('.title');
const detailInput = document.querySelector('.detail');
const selectedValue = document.querySelector('.selected-value');

async function createFeedback(e) {
  e.preventDefault();
  const category = selectedValue.textContent;
  const title = titleInput.value;
  const description = detailInput.value;

  if (title === '') {
    return errorHandler(titleInput);
  }

  if (description === '') {
    return errorHandler(detailInput);
  }

  try {
    const { data } = await axios.post('/api/v1/feedbacks', {
      category,
      title,
      description,
    });
    console.log(data);
    window.location.href = '/index.html';
  } catch (error) {
    console.log(error);
  }
}

function errorHandler(element) {
  element.style.borderColor = 'red';
  const error = document.createElement('span');
  error.innerHTML = `Can't be empty`;
  error.className = 'error-message';
  element.parentElement.appendChild(error);
  form.removeEventListener('submit', createFeedback);

  setTimeout(() => {
    element.style.borderColor = 'transparent';
    error.remove();
    form.addEventListener('submit', createFeedback);
  }, 3000);
}

export default createFeedback;
