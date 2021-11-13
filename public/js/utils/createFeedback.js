const createFeedback = (feedbacks) => {
  if (feedbacks.length === 0) {
    const noFeedback = `
    <div class="no-feedback">
  <div class="no-feedback-container">
    <img src="../assets/suggestions/illustration-empty.svg" alt="no-feedback" />
    <h3>There is no feedback yet</h3>
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

export default createFeedback;
