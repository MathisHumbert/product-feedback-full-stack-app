const allComments = document.querySelector('.all-comments');
const params = window.location.search;
const id = new URLSearchParams(params).get('id');

function displayAllComments(comments) {
  const numberOfComments = document.createElement('h3');
  numberOfComments.innerHTML = `${comments.length} Comments`;
  allComments.appendChild(numberOfComments);

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

  // reply form
  const replyForm = document.querySelectorAll('.reply-form');
  const replyInput = document.querySelectorAll('.reply-input');

  replyForm.forEach((repForm) => repForm.addEventListener('submit', postReply));

  async function postReply(e) {
    e.preventDefault();

    let targetNum = '';
    let content = e.target.children[0].value;
    replyInput.forEach((input) => {
      if (e.target.dataset.id === input.parentElement.dataset.id) {
        targetNum = e.target.dataset.id;
      }
    });

    try {
      const { data } = await axios.post(`/api/v1/feedbacks//replys/${id}`, {
        replyId: targetNum,
        content,
        user: {
          image: '../assets/user-images/image-zena.jpg',
          name: 'Zena Kelley',
          username: 'velvetround',
        },
      });
      console.log(data.result);
    } catch (error) {
      console.log(error);
    }
  }
}

const createComment = (comment) => {
  const { id, content, user } = comment;
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
        <form class="reply-form" data-id="${id}">
          <textarea class="reply-input" placeholder="Type your comment here"></textarea>
          <input type="submit" value="Post Reply" class="button1 reply-btn">
        </form>
        </div>
    `;
};

const createReply = (reply, commentEl) => {
  reply.forEach((rep) => {
    const { id, content, replyingTo, user, replies } = rep;
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
        <form class="reply-form" data-id="${id}">
          <textarea class="reply-input" placeholder="Type your comment here"></textarea>
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
