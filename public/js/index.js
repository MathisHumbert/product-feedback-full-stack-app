import toggleSidebar from './utils/sidebarToggle.js';
const sidebarBtn = document.querySelector('.sidebar-button');
sidebarBtn.addEventListener('click', toggleSidebar);

const sortBtn = document.querySelector('.sort-click');
const sortDOM = document.querySelector('.sug-container');
const sortItem = document.querySelectorAll('.single-sort-container');

sortBtn.addEventListener('click', toggleSort);
sortItem.forEach((item) => item.addEventListener('click', showSortSelected));

function toggleSort() {
  sortDOM.classList.toggle('open');
}

function showSortSelected(e) {
  sortItem.forEach((item) => {
    item.classList.remove('open');
  });
  e.target.parentElement.classList.add('open');
}

const allFeedback = document.querySelector('.all-feedbacks');

const displayFeedbacks = async () => {
  try {
    const { data } = await axios.get('/api/v1/feedbacks');
    const feedbacks = data.feedbacks;
    allFeedback.innerHTML = feedbacks
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
  } catch (error) {
    console.log(error);
  }
};

displayFeedbacks();
