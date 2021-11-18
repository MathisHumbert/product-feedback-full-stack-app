const categoryBtn = document.querySelector('.category-click');
const statuBtn = document.querySelector('.statu-click');

categoryBtn.addEventListener('click', toggleSelected);
statuBtn.addEventListener('click', toggleSelected);

function toggleSelected(e) {
  const options = e.currentTarget.parentElement.children[1];
  const arrow = e.currentTarget.parentElement.children[0].children[1];

  if (options.classList.contains('open')) {
    options.classList.remove('open');
    arrow.src = '../assets/shared/icon-arrow-down.svg';
  } else {
    options.classList.add('open');
    arrow.src = '../assets/shared/icon-arrow-up.svg';
  }
}

const singleStatu = document.querySelectorAll('.single-statu');
const singleSelect = document.querySelectorAll('.single-select');

singleSelect.forEach((item) =>
  item.addEventListener('click', (e) => {
    displaySelected(e, singleSelect);
  })
);
singleStatu.forEach((item) =>
  item.addEventListener('click', (e) => {
    displaySelected(e, singleStatu);
  })
);

function displaySelected(e, element) {
  const value = e.target.textContent;
  const options = e.target.parentElement.parentElement;
  const arrow = e.target.parentElement.parentElement.children[0].children[1];
  console.log(element);
}
