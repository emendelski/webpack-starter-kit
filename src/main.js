import './scss/main.scss';

// Babel for previous JS support
import 'core-js';
import 'regenerator-runtime/runtime';

// Local components
function component() {
  const element = document.createElement('div');
  element.innerHTML = ['webpack', 'scss', 'autoprefixer', 'babel', 'eslint', 'stylelint', 'ftp-deploy'].join(' &bull; ');

  return element;
}

document.querySelector('.content').appendChild(component());
