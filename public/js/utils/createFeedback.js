const createFeedback = (feedbacks) => {
  if (feedbacks.length === 0) {
    const noFeedback = `
    <div class="no-feedback">
  <div class="no-feedback-container">
    <img src="../assets/suggestions/illustration-empty.svg" alt="no-feedback" />
    <h1>There is no feedback yet</h1>
    <p class="body2">
      Got a suggestion? Found a bug that needs to be squashed? We love hearing
      about new ideas to improve our app.
    </p>
    <a href="feedback-new.html"
      ><button class="button1">
        + Add Feedback
      </button></a
    >
  </div>
</div>
    `;
    return noFeedback;
  } else
    return feedbacks
      .map((feedback) => {
        let { _id, title, category, upvotes, description, comments } = feedback;
        return `
      <a class="single-feedback" href="feedback-detail.html?id=${_id}">
          <p class="title">${title}</p>
          <p class="body1">${description}</p>
          <button class="category-btn">${category}</button>
          <div class="container">
            <button class="upvotes-btn">
              <img src="../assets/shared/icon-arrow-up.svg" alt="" />
              ${upvotes}
            </button>
            <div class="votes-container">
              <img src="../assets/shared/icon-comments.svg" alt="" />
              <p class="body1 ${comments.length === 0 ? 'zero' : ''}" >${
          comments.length
        }</p>
            </div>
          </div>
        </a>
      `;
      })
      .join('');
};

export default createFeedback;
