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

function displaySelected(e, element) {
  const value = e.target.textContent;
  const options = e.target.parentElement.parentElement;
  const arrow = options.parentElement.children[0].children[1];
  const updatedValue = options.parentElement.children[0].children[0];

  displayRightOption(element, value);

  options.classList.remove('open');
  updatedValue.textContent = value;
  arrow.src = '../assets/shared/icon-arrow-down.svg';
}

function displayRightOption(element, value) {
  element.forEach((el) => {
    el.parentElement.classList.remove('open');
    if (el.textContent === value) {
      el.parentElement.classList.add('open');
    }
  });
}

export { toggleSelected, displaySelected, displayRightOption };
