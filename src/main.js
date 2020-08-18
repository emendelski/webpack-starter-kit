import './scss/main.scss';

// Local components
function component() {
  const element = document.createElement('div');
  element.innerHTML = [
    'webpack',
    'scss',
    'autoprefixer',
    'babel',
    'eslint',
    'stylelint',
    'ftp-deploy',
  ].join(' &bull; ');

  return element;
}

document.querySelector('.content').appendChild(component());
