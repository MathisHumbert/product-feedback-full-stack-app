const plannedNumber = document.querySelector('.planned-number');
const progressNumber = document.querySelector('.progress-number');
const liveNumber = document.querySelector('.live-number');

function roadmapNumberHandler(data) {
  let planned = 0;
  let inProgress = 0;
  let live = 0;

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

    plannedNumber.textContent = planned;
    progressNumber.textContent = inProgress;
    liveNumber.textContent = live;
  });
}

export default roadmapNumberHandler;
