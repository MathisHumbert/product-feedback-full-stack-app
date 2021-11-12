const sidebar = document.querySelector('.nav-sidebar');

function toggleSidebar(e) {
  if (e.target.src.includes('hamburger')) {
    sidebar.classList.add('open');
    e.target.src = '../assets/shared/mobile/icon-close.svg';
    document.body.style.overflowY = 'hidden';
  } else {
    sidebar.classList.remove('open');
    e.target.src = '../assets/shared/mobile/icon-hamburger.svg';
    document.body.style.overflowY = 'inherit';
  }
}

export default toggleSidebar;
