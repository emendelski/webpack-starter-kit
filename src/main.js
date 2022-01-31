import './scss/main.scss';

// Local components
function handleWindow() {
  const body = document.querySelector('body');

  if (window.innerWidth > body.clientWidth) {
    body.classList.add('has-scrollbar');
    body.style.setProperty('--scroll-bar', `${window.innerWidth - body.clientWidth}px`);
  } else {
    body.classList.remove('has-scrollbar');
  }
}

handleWindow();
