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

export default createFeedback;
