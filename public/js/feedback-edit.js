import {
  toggleSelected,
  displaySelected,
  displayRightOption,
} from './utils-feedback/showMoreEdit.js';

const categoryBtn = document.querySelector('.category-click');
const statuBtn = document.querySelector('.statu-click');
const singleStatu = document.querySelectorAll('.single-statu');
const singleSelect = document.querySelectorAll('.single-select');

categoryBtn.addEventListener('click', toggleSelected);
statuBtn.addEventListener('click', toggleSelected);

singleSelect.forEach((item) =>
  item.addEventListener('click', (e) => {
    displaySelected(e, singleSelect);
  })
);
singleStatu.forEach((item) =>
  item.addEventListener('click', (e) => {
    displaySelected(e, singleStatu);
  })
);

const selectValue = document.querySelector('.select-value');
const statuValue = document.querySelector('.statu-value');
const titleInput = document.querySelector('.title');
const detailInput = document.querySelector('.detail');

const params = window.location.search;
const id = new URLSearchParams(params).get('id');

window.addEventListener('DOMContentLoaded', displayActualData);

async function displayActualData() {
  try {
    const { data } = await axios.get(`/api/v1/feedbacks/${id}`);
    console.log(data);
    selectValue.innerHTML = data.category;
    statuValue.innerHTML = data.status;
    titleInput.value = data.title;
    detailInput.value = data.description;

    displayRightOption(singleSelect, data.category);
    displayRightOption(singleStatu, data.status);
  } catch (error) {
    console.log(error);
  }
}

const deleteBtn = document.querySelector('.delete-btn');

deleteBtn.addEventListener('click', deleteFeedback);

async function deleteFeedback(e) {
  e.preventDefault();
  console.log('deleted');
}

const editBtn = document.querySelector('.edit-btn');

editBtn.addEventListener('click', editFeedback);

async function editFeedback(e) {
  e.preventDefault();

  const category = selectValue.innerHTML;
  const status = statuValue.innerHTML;
  const title = titleInput.value;
  const description = detailInput.value;
}
