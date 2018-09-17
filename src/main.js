import _ from 'lodash';

import './scss/main.scss';

function component() {
  const element = document.createElement('div');
  element.innerHTML = _.join(['webpack', 'scss', 'autoprefixer', 'babel', 'eslint', 'stylelint', 'ftp-deploy'], ' &bull; ');

  return element;
}

document.querySelector('.content').appendChild(component());
