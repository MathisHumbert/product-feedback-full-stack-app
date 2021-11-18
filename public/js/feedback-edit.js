import {
  toggleSelected,
  displaySelected,
} from './utils-feedback/showMoreEdit.js';

import {
  displayActualData,
  editFeedback,
  deleteFeedback,
} from './utils-feedback/edit-delete-feedback.js';

const categoryBtn = document.querySelector('.category-click');
const statuBtn = document.querySelector('.statu-click');
const singleStatu = document.querySelectorAll('.single-statu');
const singleSelect = document.querySelectorAll('.single-select');
const editBtn = document.querySelector('.edit-btn');
const deleteBtn = document.querySelector('.delete-btn');

window.addEventListener('DOMContentLoaded', displayActualData);
editBtn.addEventListener('click', editFeedback);
deleteBtn.addEventListener('click', deleteFeedback);

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
