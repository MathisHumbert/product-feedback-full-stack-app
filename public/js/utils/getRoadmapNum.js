const plannedNumber = document.querySelectorAll('.planned-number');
const progressNumber = document.querySelectorAll('.progress-number');
const liveNumber = document.querySelectorAll('.live-number');
const suggNumber = document.querySelector('.suggestions-number');

function roadmapNumberHandler(data) {
  let planned = 0;
  let inProgress = 0;
  let live = 0;
  let sugg = 0;

  data.forEach((item) => {
    if (item.status == 'planned') {
      planned++;
    }
    if (item.status == 'in-progress') {
      inProgress++;
    }
    if (item.status == 'live') {
      live++;
    }
    if (item.status == 'suggestion') {
      sugg++;
    }
  });

  plannedNumber.forEach((item) => (item.textContent = planned));
  progressNumber.forEach((item) => (item.textContent = inProgress));
  liveNumber.forEach((item) => (item.textContent = live));
  suggNumber.textContent = `${sugg} Suggestions`;
}

export default roadmapNumberHandler;
