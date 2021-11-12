import toggleSidebar from './utils/sidebarToggle.js';
const sidebarBtn = document.querySelector('.sidebar-button');
sidebarBtn.addEventListener('click', toggleSidebar);

const sortBtn = document.querySelector('.sort-click');
const sortDOM = document.querySelector('.sug-container');
const sortItem = document.querySelectorAll('.single-sort');
const sortText = document.querySelector('.sort-text');
const allFeedback = document.querySelector('.all-feedbacks');

sortBtn.addEventListener('click', toggleSort);
sortItem.forEach((item) =>
  item.addEventListener('click', displaySortedFeedbacks)
);

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

//const allFeedback = document.querySelector('.all-feedbacks');
const plannedNumber = document.querySelector('.planned-number');
const progressdNumber = document.querySelector('.progress-number');
const liveNumber = document.querySelector('.live-number');

const displayAllFeedbacks = async () => {
  try {
    const sort =
      localStorage.getItem('sortFeedback') === null
        ? 'Most Upvotes'
        : localStorage.getItem('sortFeedback');

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

    sortHandler(sort);
    filterHandler(filter);
  } catch (error) {
    console.log(error);
  }
};

displayAllFeedbacks();

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

const createFeedback = (feedbacks) => {
  return feedbacks
    .map((feedback) => {
      let { _id, title, category, upvotes, description, comments } = feedback;
      return `
      <div class="single-feedback">
          <a href="feedback-detail.html?id=${_id}">${title}</a>
          <p class="body1">${description}</p>
          <button class="category-btn">${category}</button>
          <div class="container">
            <button class="upvotes-btn">
              <img src="../assets/shared/icon-arrow-up.svg" alt="" />
              ${upvotes}
            </button>
            <div class="votes-container">
              <img src="../assets/shared/icon-comments.svg" alt="" />
              <p class="body1">${comments.length}</p>
            </div>
          </div>
        </div>
      `;
    })
    .join('');
};

const filterBtn = document.querySelectorAll('.filter-btn');

filterBtn.forEach((btn) =>
  btn.addEventListener('click', displayFilteredFeedbacks)
);

async function displayFilteredFeedbacks(e) {
  const filter = e.target.textContent;

  filterHandler(filter);

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
