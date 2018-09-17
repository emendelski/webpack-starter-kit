import _ from 'lodash';

import './scss/main.scss';

function component() {
  const element = document.createElement('div');
  const p = [1, 2, 3].map(n => n + 1);

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack', 'my', 'dear', 'friend:', p], ' ');

  return element;
}

document.body.appendChild(component());
