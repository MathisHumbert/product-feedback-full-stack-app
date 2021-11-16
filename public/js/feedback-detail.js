import createFeedback from './utils/createFeedback.js';

const feedbackContainer = document.querySelector('.single-feedback-container');
const allComments = document.querySelectorAll('.all-comments');
const params = window.location.search;
const id = new URLSearchParams(params).get('id');

const getFeedback = async () => {
  try {
    const { data } = await axios.get(`/api/v1/feedbacks/${id}`);
    feedbackContainer.innerHTML = createFeedback([data]);
    displayAllComments(data.comments);
  } catch (error) {
    console.log(error);
  }
};

getFeedback();

function displayAllComments(comments) {
  comments.forEach((comment) => {
    console.log(comment);
    console.log(comment.user);

    const commentEl = document.createElement('article');
    commentEl.className = 'main-comment';
    commentEl.innerHTML = `
    <div class="main-comment-container">
        <div class="header">
          <div class="info">
            <img src="../assets/user-images/image-anne.jpg" alt="">
            <div class="text">
              <h4>Elijah Moss</h4>
              <p>@hexagon.bestagon</p>
            </div>
          </div>
          <span class="reply-btn">Reply</span>
        </div>
        <div class="main-text">
          Also, please allow styles to be applied based on system preferences. I would love to be able to browse Frontend Mentor in the evening after my device’s dark mode turns on without the bright background it currently has.
        </div>
        <form action="#" class="reply-form">
          <textarea class="reply-input" required placeholder="Type your comment here"></textarea>
          <input type="submit" value="Post Reply" class="button1 reply-btn">
        </form>
        </div>
    `;
  });
}
