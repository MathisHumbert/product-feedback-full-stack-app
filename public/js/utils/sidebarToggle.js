const sidebar = document.querySelector('.aside-sidebar');
const sidebarBlack = document.querySelector('.aside-sidebar-black');
const body = document.querySelector('body');

function toggleSidebar(e) {
  if (e.target.src.includes('hamburger')) {
    sidebar.classList.add('open');
    sidebarBlack.classList.add('open');
    body.classList.add('stop-scrolling');
    e.target.src = '../assets/shared/mobile/icon-close.svg';
  } else {
    sidebar.classList.remove('open');
    sidebarBlack.classList.add('open');
    body.classList.remove('stop-scrolling');
    e.target.src = '../assets/shared/mobile/icon-hamburger.svg';
  }
}

export default toggleSidebar;
