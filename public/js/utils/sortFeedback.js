import createFeedback from './createFeedback.js';

const sortDOM = document.querySelector('.sug-container');
const sortItem = document.querySelectorAll('.single-sort');
const sortText = document.querySelector('.sort-text');
const allFeedback = document.querySelector('.all-feedbacks');

function toggleSort() {
  sortDOM.classList.toggle('open');
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

    const { data } = await axios.get('/api/v1/feedbacks', {
      headers: {
        filter,
        sort,
      },
    });

    allFeedback.innerHTML = createFeedback(data.feedbacks);
    localStorage.setItem('sortFeedback', e.target.textContent);
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
    }
  });

  sortText.innerHTML = `<span class="regular"> Sort by :</span> ${sort}`;
}

export { toggleSort, displaySortedFeedbacks, sortHandler };
