import toggleSidebar from './utils/sidebarToggle.js';
import { displayFilteredFeedbacks } from './utils/filterFeedbacks.js';
import { toggleSort, displaySortedFeedbacks } from './utils/sortFeedback.js';
import displayAllFeedbacks from './utils/displayAllFeedbacks.js';

const sidebarBtn = document.querySelector('.sidebar-button');
const filterBtn = document.querySelectorAll('.filter-btn');
const sortBtn = document.querySelector('.sort-click');
const sortItem = document.querySelectorAll('.single-sort');

sidebarBtn.addEventListener('click', toggleSidebar);

filterBtn.forEach((btn) =>
  btn.addEventListener('click', displayFilteredFeedbacks)
);

sortBtn.addEventListener('click', toggleSort);

sortItem.forEach((item) =>
  item.addEventListener('click', displaySortedFeedbacks)
);

window.addEventListener('DOMContentLoaded', displayAllFeedbacks);
