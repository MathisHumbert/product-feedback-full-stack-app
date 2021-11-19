function upvoteHandler(allFeedback) {
  const upvotes = allFeedback.querySelectorAll('.upvotes-btn');
  upvotes.forEach((upvote) =>
    upvote.addEventListener('click', upvoteBtnFeedback)
  );
}
async function upvoteBtnFeedback(e) {
  let target = e.currentTarget;
  const id = target.dataset.id;

  try {
    const response = await fetch('/api/v1/feedbacks/upvoted', {
      method: 'PUT',
      body: JSON.stringify({
        id,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const data = await response.json();

    const { upvotes, upvoted } = data;
    if (upvoted) {
      target.className = 'upvotes-btn active';
      target.children[0].src = '../assets/shared/icon-arrow-up-white.svg';
    } else {
      target.className = 'upvotes-btn';
      target.children[0].src = '../assets/shared/icon-arrow-up.svg';
    }
    target.children[1].textContent = upvotes;
  } catch (error) {
    console.log(error);
  }
}

export default upvoteHandler;
