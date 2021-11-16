const numberOfComments = document.querySelector('.number-comments');
const allComments = document.querySelector('.all-comments');

function displayAllComments(comments) {
  numberOfComments.innerHTML = `${comments.length} Comments`;
  comments.forEach((comment) => {
    const { replies } = comment;
    const commentEl = document.createElement('article');
    commentEl.className = 'main-comment';
    commentEl.innerHTML = createComment(comment);

    if (replies) {
      createReply(replies, commentEl);
    }
    allComments.appendChild(commentEl);
  });
}

const createComment = (comment) => {
  const { content, user } = comment;
  const { image, name, username } = user;
  return `
    <div class="main-comment-container">
        <div class="header">
          <div class="info">
            <img src="${image}" alt="portrait">
            <div class="text">
              <h4>${name}</h4>
              <p>@${username}</p>
            </div>
          </div>
          <span class="reply-toggle">Reply</span>
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
};

const createReply = (reply, commentEl) => {
  reply.forEach((rep) => {
    const { content, replyingTo, user, replies } = rep;
    const { image, name, username } = user;

    const replyEl = document.createElement('article');
    replyEl.className = 'reply-comment';
    replyEl.innerHTML = `
    <div class="reply-comment-container">
        <div class="header">
          <div class="info">
            <img src="${image}" alt="portrait">
            <div class="text">
              <h4>${name}</h4>
              <p>@${username}</p>
            </div>
          </div>
          <span class="reply-toggle">Reply</span>
        </div>
        <div class="main-text">
        <span class="rep-person">@${replyingTo}</span> ${content}
        </div>
        <form action="#" class="reply-form">
          <textarea class="reply-input" required placeholder="Type your comment here"></textarea>
          <input type="submit" value="Post Reply" class="button1 reply-btn">
        </form>
        </div>
    `;

    if (replies) {
      createReply(replies, replyEl);
    }
    commentEl.appendChild(replyEl);
  });
};

const showReply = (e) => {
  const parent = e.target.parentElement.parentElement;
  parent.classList.toggle('open');
};

export { displayAllComments, showReply };
