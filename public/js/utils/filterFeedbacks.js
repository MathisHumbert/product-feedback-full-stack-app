import createHtmlFeedback from './createHtmlFeedback.js';
import roadmapNumberHandler from './getRoadmapNum.js';
import upvoteHandler from './upvoteHandler.js';

const filterBtn = document.querySelectorAll('.filter-btn');
const sidebar = document.querySelector('.aside-sidebar');
const sidebarBlack = document.querySelector('.aside-sidebar-black');
const body = document.querySelector('body');
const allFeedback = document.querySelector('.all-feedbacks');
const sidebarBtn = document.querySelector('.sidebar-button');

async function displayFilteredFeedbacks(e) {
  const filter = e.target.textContent;

  filterHandler(filter);

  sidebar.classList.remove('open');
  sidebarBlack.classList.remove('open');
  body.classList.remove('stop-scrolling');
  sidebarBtn.src = '../assets/shared/mobile/icon-hamburger.svg';
  document.body.style.overflowY = 'inherit';

  const sort =
    localStorage.getItem('sortFeedback') === null
      ? 'Most Upvotes'
      : localStorage.getItem('sortFeedback');

  try {
    const response = await fetch('/api/v1/feedbacks', {
      method: 'GET',
      headers: {
        sort: sort,
        filter: filter,
      },
    });
    const data = await response.json();

    allFeedback.innerHTML = createHtmlFeedback(data.feedbacks);
    roadmapNumberHandler(data.feedbacks);
    localStorage.setItem('filterFeedback', e.target.textContent);
    upvoteHandler(allFeedback);
  } catch (error) {
    console.log(error);
  }
}

function filterHandler(filter) {
  filterBtn.forEach((item) => {
    if (item.textContent == filter) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

export { displayFilteredFeedbacks, filterHandler };
