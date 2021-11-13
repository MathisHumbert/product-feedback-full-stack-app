import roadmapNumberHandler from './getRoadmapNum.js';
import { sortHandler } from './sortFeedback.js';
import { filterHandler } from './filterFeedbacks.js';
import createFeedback from './createFeedback.js';

const allFeedback = document.querySelector('.all-feedbacks');

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
    const upvotes = allFeedback.querySelectorAll('.upvotes-btn');
    upvotes.forEach((upvote) =>
      upvote.addEventListener('click', upvoteBtnFeedback)
    );

    roadmapNumberHandler(data.feedbacks);
    sortHandler(sort);
    filterHandler(filter);
  } catch (error) {
    console.log(error);
  }
};

async function upvoteBtnFeedback(e) {
  const id = e.currentTarget.dataset.id;
  try {
    const { data } = await axios.post('/api/v1/feedbacks/upvoted', {
      id,
    });
    const { upvotes, upvoted } = data;
    console.log(upvotes, upvoted);
  } catch (error) {
    console.log(error);
  }
}

export default displayAllFeedbacks;

// let upvoteNumber = Number(e.currentTarget.children[1].textContent);
// if (e.currentTarget.classList.contains('active')) {
//   e.currentTarget.classList.remove('active');
// } else {
//   e.currentTarget.classList.add('active');
// }
