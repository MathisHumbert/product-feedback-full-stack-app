import createHtmlFeedback from './createHtmlFeedback.js';
import upvoteHandler from './upvoteHandler.js';

const sortDOM = document.querySelector('.sug-container');
const sortItem = document.querySelectorAll('.single-sort');
const sortText = document.querySelector('.sort-text');
const allFeedback = document.querySelector('.all-feedbacks');
const sortArrow = document.querySelector('.sort-arrow');

function toggleSort() {
  sortDOM.classList.toggle('open');
  if (sortDOM.classList.contains('open')) {
    sortArrow.src = '../assets/shared/icon-arrow-up-white.svg';
  } else {
    sortArrow.src = '../assets/shared/icon-arrow-down-white.svg';
  }
}

async function displaySortedFeedbacks(e) {
  const sort = e.target.textContent;

  sortHandler(sort);

  sortDOM.classList.remove('open');

  try {
    const filter =
      localStorage.getItem('filterFeedback') === null
        ? 'all'
        : localStorage.getItem('filterFeedback');

    const response = await fetch(
      `/api/v1/feedbacks?filter=${filter}&sort=${sort}`,
      {
        method: 'GET',
      }
    );
    const data = await response.json();

    allFeedback.innerHTML = createHtmlFeedback(data.feedbacks);
    localStorage.setItem('sortFeedback', e.target.textContent);
    upvoteHandler(allFeedback);
  } catch (error) {
    console.log(error);
  }
}

function sortHandler(sort) {
  sortItem.forEach((item) => {
    if (item.textContent == sort) {
      item.parentElement.classList.add('open');
    } else {
      item.parentElement.classList.remove('open');
      sortArrow.src = '../assets/shared/icon-arrow-down-white.svg';
    }
  });

  sortText.innerHTML = `<span class="regular"> Sort by :</span> ${sort}`;
}

export { toggleSort, displaySortedFeedbacks, sortHandler };
