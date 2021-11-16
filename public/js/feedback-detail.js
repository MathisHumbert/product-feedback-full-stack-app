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
    const { content, user, replies } = comment;
    const { image, name, username } = user;
    console.log(user);

    const commentEl = document.createElement('article');
    commentEl.className = 'main-comment';
    commentEl.innerHTML = `
    <div class="main-comment-container">
        <div class="header">
          <div class="info">
            <img src="${image}" alt="portrait">
            <div class="text">
              <h4>${name}</h4>
              <p>@${username}</p>
            </div>
          </div>
          <span class="reply-btn">Reply</span>
        </div>
        <div class="main-text">
        ${content}
        </div>
        <form action="#" class="reply-form">
          <textarea class="reply-input" required placeholder="Type your comment here"></textarea>
          <input type="submit" value="Post Reply" class="button1 reply-btn">
        </form>
        </div>
    `;

    if (replies) {
      createReply(replies);
    }
  });
}

const createComment = (comment) => {};

const createReply = (reply) => {};
