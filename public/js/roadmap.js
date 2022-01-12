import upvoteHandler from '../js/utils/upvoteHandler.js';

const roadmapSection = document.querySelector('.roadmap-section');
const roadmapHeaderClick = document.querySelectorAll('.roadmap-header-click');
const plannedHeader = document.querySelector('.planned-header');
const progressHeader = document.querySelector('.progress-header');
const liveHeader = document.querySelector('.live-header');

window.addEventListener('DOMContentLoaded', displayRoadmap);

async function displayRoadmap() {
  try {
    const response = await fetch('/api/v1/feedbacks');
    const data = await response.json();
    console.log(data);
    const feedbacks = data.feedbacks;

    let planned = 0;
    let inProgress = 0;
    let live = 0;

    feedbacks.forEach((item) => {
      if (item.status == 'planned') {
        planned++;
      }
      if (item.status == 'in-progress') {
        inProgress++;
      }
      if (item.status == 'live') {
        live++;
      }
    });

    plannedHeader.textContent = `Planned (${planned})`;
    progressHeader.textContent = `In-Progress (${inProgress})`;
    liveHeader.textContent = `Live (${live})`;

    const plannedEl = document.createElement('article');
    plannedEl.innerHTML = `
  <div class="text">
    <h3>Planned (${planned})</h3>
    <p class="body1">Ideas prioritized for research</p>
  </div>
  `;
    plannedEl.className = 'single-roadmap orange';

    const progressEl = document.createElement('article');
    progressEl.innerHTML = `
  <div class="text">
    <h3>In-Progress (${inProgress})</h3>
    <p class="body1">Currently being developed</p>
  </div>
  `;
    progressEl.className = 'single-roadmap purple active';

    const liveEl = document.createElement('article');
    liveEl.innerHTML = `
  <div class="text">
    <h3>Live (${live})</h3>
    <p class="body1">Ideas prioritized for research</p>
  </div>
  `;
    liveEl.className = 'single-roadmap blue';

    feedbacks.forEach((feedback) => {
      if (feedback.status === 'planned') {
        const roadmapItem = document.createElement('div');
        roadmapItem.className = 'single-roadmap-item';
        roadmapItem.innerHTML = createRoadmap(feedback, 'Planned');
        plannedEl.appendChild(roadmapItem);
      }
      if (feedback.status === 'in-progress') {
        const roadmapItem = document.createElement('div');
        roadmapItem.className = 'single-roadmap-item active';
        roadmapItem.innerHTML = createRoadmap(feedback, 'In-Progress');
        progressEl.appendChild(roadmapItem);
      }
      if (feedback.status === 'live') {
        const roadmapItem = document.createElement('div');
        roadmapItem.className = 'single-roadmap-item';
        roadmapItem.innerHTML = createRoadmap(feedback, 'Live');
        liveEl.appendChild(roadmapItem);
      }
    });

    roadmapSection.appendChild(plannedEl);
    roadmapSection.appendChild(progressEl);
    roadmapSection.appendChild(liveEl);

    upvoteHandler(roadmapSection);

    roadmapHeaderClick.forEach((item) =>
      item.addEventListener('click', toggleSingleRoadmap)
    );
  } catch (error) {
    console.log(error);
  }
}

function createRoadmap(data, type) {
  const { _id, title, description, upvoted, upvotes, comments, category } =
    data;
  return `
  <div class="top-color"></div>
  <div class="header-container">
    <div class="circle purple"></div>
    <p class="body1">${type}</p>
  </div>
  <a href="feedback-detail.html?id=${_id}">${title}</a>
  <p class="body1 description">${description}</p>
  <button class="category-btn">${category}</button>
  <div class="container">
    <button
      class="upvotes-btn ${upvoted === true ? 'active' : ''}"
      data-id="${_id}"
    >
      <img src="../assets/shared/icon-arrow-up${
        upvoted === true ? '-white' : ''
      }.svg" alt="" />
      <p class="upvotes-number">${upvotes}</p>
    </button>
    <div class="votes-container">
      <img src="../assets/shared/icon-comments.svg" alt="arrow" />
      <p class="body1 ${comments.length === 0 ? 'zero' : ''}">${
    comments.length
  }</p>
    </div>
  </div>
 `;
}

function toggleSingleRoadmap(e) {
  const singleRoadmap = roadmapSection.querySelectorAll('.single-roadmap');

  const item = e.target.classList[0];

  roadmapHeaderClick.forEach((item) => {
    item.classList.remove('active');
  });

  singleRoadmap.forEach((item) => {
    item.classList.remove('active');
  });

  if (item.includes('progress')) {
    e.target.classList.add('active');
    singleRoadmap[1].classList.add('active');
  }
  if (item.includes('planned')) {
    e.target.classList.add('active');
    singleRoadmap[0].classList.add('active');
  }
  if (item.includes('live')) {
    e.target.classList.add('active');
    singleRoadmap[2].classList.add('active');
  }
}
