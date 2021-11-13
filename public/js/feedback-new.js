const selectClick = document.querySelector('.select-click');
const selectCategory = document.querySelector('.select-options');
const selectArrow = document.querySelector('.select-arrow');
const ownSlect = document.querySelector('.own-select');
const singleSelect = document.querySelectorAll('.single-select');
const selectedValue = document.querySelector('.selected-value');

selectClick.addEventListener('click', toggleCategory);
singleSelect.forEach((select) =>
  select.addEventListener('click', selectHandler)
);

function toggleCategory() {
  selectCategory.classList.toggle('open');
  if (selectCategory.classList.contains('open')) {
    selectArrow.src = '../assets/shared/icon-arrow-up.svg';
    ownSlect.classList.add('active');
  } else {
    selectArrow.src = '../assets/shared/icon-arrow-down.svg';
    ownSlect.classList.remove('active');
  }
}

function selectHandler(e) {
  singleSelect.forEach((item) => {
    item.parentElement.classList.remove('open');
  });
  selectedValue.textContent = e.target.textContent;
  e.target.parentElement.classList.add('open');
  selectArrow.src = '../assets/shared/icon-arrow-down.svg';
  selectCategory.classList.toggle('open');
  ownSlect.classList.remove('active');
}
