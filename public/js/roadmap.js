const roadmapSection = document.querySelector('.roadmap-section');

const displayRoadmap = async () => {
  try {
    const { data } = await axios.get('/api/v1/feedbacks');
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

    // planned
    const plannedEl = document.createElement('article');
    plannedEl.innerHTML = `
  <div class="text">
   <h3>Planned (${planned})</h3>
    <p class="body1">Ideas prioritized for research</p>
  </div>
  `;
    plannedEl.className = 'single-roadmap orange';

    // in-progress
    const progressEl = document.createElement('article');
    progressEl.innerHTML = `
  <div class="text">
   <h3>In-Progress (${inProgress})</h3>
    <p class="body1">Currently being developed</p>
  </div>
  `;
    progressEl.className = 'single-roadmap purple active';

    // planned
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
        roadmapItem.innerHTML = createRoadmap(feedback, 'planned');
        plannedEl.appendChild(roadmapItem);
      }
      if (feedback.status === 'in-progress') {
        const roadmapItem = document.createElement('div');
        roadmapItem.className = 'single-roadmap-item active';
        roadmapItem.innerHTML = createRoadmap(feedback, 'in-progress');
        progressEl.appendChild(roadmapItem);
      }
      if (feedback.status === 'live') {
        const roadmapItem = document.createElement('div');
        roadmapItem.className = 'single-roadmap-item';
        roadmapItem.innerHTML = createRoadmap(feedback, 'live');
        liveEl.appendChild(roadmapItem);
      }
    });

    roadmapSection.appendChild(plannedEl);
    roadmapSection.appendChild(progressEl);
    roadmapSection.appendChild(liveEl);
  } catch (error) {
    console.log(error);
  }
};

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
  <p class="body1">${description}</p>
  <button class="category-btn">${category}</button>
  <div class="container">
    <button
      class="upvotes-btn ${upvoted === true ? 'active' : ''}"
      data-id="${_id}"
    >
      <img src="../assets/shared/icon-arrow-up.svg" alt="" />
      <p class="upvotes-number">${upvotes}</p>
    </button>
    <div class="votes-container">
      <img src="../assets/shared/icon-comments.svg" alt="arrow" />
      <p class="body1 ${comments.length === 0 ? 'zero' : ''}">1</p>
    </div>
  </div>
 `;
}

displayRoadmap();

// window.addEventListener('DOMContentLoaded', displayRoadmap);
