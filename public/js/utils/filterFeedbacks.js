import createFeedback from './createFeedback.js';
import roadmapNumberHandler from './getRoadmapNum.js';

const filterBtn = document.querySelectorAll('.filter-btn');
const sidebar = document.querySelector('.nav-sidebar');
const allFeedback = document.querySelector('.all-feedbacks');
const sidebarBtn = document.querySelector('.sidebar-button');

async function displayFilteredFeedbacks(e) {
  const filter = e.target.textContent;

  filterHandler(filter);

  sidebar.classList.remove('open');
  sidebarBtn.src = '../assets/shared/mobile/icon-hamburger.svg';
  document.body.style.overflowY = 'inherit';

  const sort =
    localStorage.getItem('sortFeedback') === null
      ? 'Most Upvotes'
      : localStorage.getItem('sortFeedback');

  try {
    const { data } = await axios.get('/api/v1/feedbacks', {
      headers: {
        filter,
        sort,
      },
    });
    allFeedback.innerHTML = createFeedback(data.feedbacks);
    roadmapNumberHandler(data.feedbacks);
    localStorage.setItem('filterFeedback', e.target.textContent);
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
