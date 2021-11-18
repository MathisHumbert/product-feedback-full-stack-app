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
    const { data } = await axios.get(`/api/v1/feedbacks/${id}`);
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
    await axios.patch(`/api/v1/feedbacks/${id}`, {
      category,
      status,
      title,
      description,
    });
    window.location.href = '/index.html';
  } catch (error) {
    console.log(error);
  }
}

async function deleteFeedback(e) {
  e.preventDefault();

  try {
    await axios.delete(`/api/v1/feedbacks/${id}`);
    window.location.href = '/index.html';
  } catch (error) {}
}

export { displayActualData, editFeedback, deleteFeedback };
