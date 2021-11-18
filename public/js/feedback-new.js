import createNewFeedback from './utils-feedback/createNewFeedback.js';
import { toggleCategory, selectHandler } from './utils-feedback/showMore.js';
const selectClick = document.querySelector('.select-click');
const singleSelect = document.querySelectorAll('.single-select');

selectClick.addEventListener('click', toggleCategory);
singleSelect.forEach((select) =>
  select.addEventListener('click', selectHandler)
);

const form = document.querySelector('.create-form');

form.addEventListener('submit', createNewFeedback);
