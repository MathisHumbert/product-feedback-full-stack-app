import { displayRightOption } from './showMoreEdit.js';

const params = window.location.search;
const id = new URLSearchParams(params).get('id');

const selectValue = document.querySelector('.select-value');
const statuValue = document.querySelector('.statu-value');
const titleInput = document.querySelector('.title');
const detailInput = document.querySelector('.detail');
const singleSelect = document.querySelectorAll('.single-select');
const singleStatu = document.querySelectorAll('.single-statu');
const editName = document.querySelector('.edit-name');

async function displayActualData() {
  try {
    const response = await fetch(`/api/v1/feedbacks/${id}`);
    const data = await response.json();

    selectValue.innerHTML = data.category;
    statuValue.innerHTML = data.status;
    titleInput.value = data.title;
    detailInput.value = data.description;
    editName.innerHTML = `Editing ${data.title}`;

    displayRightOption(singleSelect, data.category);
    displayRightOption(singleStatu, data.status);
  } catch (error) {
    console.log(error);
  }
}

async function editFeedback(e) {
  e.preventDefault();

  const category = selectValue.innerHTML;
  const status = statuValue.innerHTML;
  const title = titleInput.value;
  const description = detailInput.value;

  try {
    await fetch(`/api/v1/feedbacks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        category,
        status,
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

async function deleteFeedback(e) {
  e.preventDefault();

  try {
    await fetch(`/api/v1/feedbacks/${id}`, {
      method: 'DELETE',
    });
    window.location.href = './';
  } catch (error) {}
}

export { displayActualData, editFeedback, deleteFeedback };
