const form = document.querySelector('.create-form');
const titleInput = document.querySelector('.title');
const detailInput = document.querySelector('.detail');
const selectedValue = document.querySelector('.selected-value');

async function createNewFeedback(e) {
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
    await fetch('/api/v1/feedbacks', {
      method: 'POST',
      body: JSON.stringify({
        category,
        title,
        description,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    window.location.href = './';
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
  form.removeEventListener('submit', createNewFeedback);

  setTimeout(() => {
    element.style.borderColor = 'transparent';
    error.remove();
    form.addEventListener('submit', createNewFeedback);
  }, 3000);
}

export default createNewFeedback;
