import toggleSidebar from './utils/sidebarToggle.js';
const sidebarBtn = document.querySelector('.sidebar-button');
sidebarBtn.addEventListener('click', toggleSidebar);

const sortBtn = document.querySelector('.sort-click');
const sortDOM = document.querySelector('.sug-container');
const sortItem = document.querySelectorAll('.single-sort-container');
const allFeedback = document.querySelector('.all-feedbacks');

sortBtn.addEventListener('click', toggleSort);
sortItem.forEach((item) => item.addEventListener('click', showSortSelected));

function toggleSort() {
  sortDOM.classList.toggle('open');
}

async function showSortSelected(e) {
  sortItem.forEach((item) => {
    item.classList.remove('open');
  });
  e.target.parentElement.classList.add('open');

  try {
    const { data } = await axios.get('/api/v1/feedbacks', {
      headers: {
        sort: e.target.textContent,
      },
    });
    allFeedback.innerHTML = createFeedback(data.feedbacks);
  } catch (error) {
    console.log(error);
  }
  // sort by the value
  // add ttje value to the text sort by:
}

//const allFeedback = document.querySelector('.all-feedbacks');
const plannedNumber = document.querySelector('.planned-number');
const progressdNumber = document.querySelector('.progress-number');
const liveNumber = document.querySelector('.live-number');

const displayAllFeedbacks = async () => {
  try {
    const { data } = await axios.get('/api/v1/feedbacks');
    allFeedback.innerHTML = createFeedback(data.feedbacks);
  } catch (error) {
    console.log(error);
  }
};

displayAllFeedbacks();

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
