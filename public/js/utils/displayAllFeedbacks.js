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

    roadmapNumberHandler(data.feedbacks);
    sortHandler(sort);
    filterHandler(filter);
  } catch (error) {
    console.log(error);
  }
};

export default displayAllFeedbacks;