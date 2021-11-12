console.log('hello');

const sidebarBtn = document.querySelector('.sidebar-button');
const sidebar = document.querySelector('.nav-sidebar');

sidebarBtn.addEventListener('click', toggleSidebar);

function toggleSidebar(e) {
  if (e.target.src.includes('hamburger')) {
    sidebar.classList.add('open');

    e.target.src = '../assets/shared/mobile/icon-close.svg';
  } else {
    sidebar.classList.remove('open');
    e.target.src = '../assets/shared/mobile/icon-hamburger.svg';
  }
}

const sortBtn = document.querySelector('.sort-click');
const sortDOM = document.querySelector('.sug-container');
const sortItem = document.querySelectorAll('.single-sort-container');

sortBtn.addEventListener('click', toggleSort);
sortItem.forEach((item) => item.addEventListener('click', showSortSelected));

function toggleSort() {
  sortDOM.classList.toggle('open');
}

function showSortSelected(e) {
  sortItem.forEach((item) => {
    item.classList.remove('open');
  });
  e.target.parentElement.classList.add('open');
}
