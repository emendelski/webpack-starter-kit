import './docs.scss';

import 'prismjs';
import 'prismjs/plugins/unescaped-markup/prism-unescaped-markup';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';

const main = document.querySelector('.js-main');
const nav = document.querySelector('.js-nav');
const sections = main.querySelectorAll('.section');

const createLink = (type, name, target) => {
  const li = document.createElement('li');
  const link = document.createElement('a');

  link.innerText = name;
  link.setAttribute('href', `#${target}`);
  link.classList.add(type, 'nav__link');

  li.classList.add('nav__item');

  li.appendChild(link);
  nav.appendChild(li);
};

sections.forEach((section) => {
  const h2 = section.querySelector('h2');
  const h3s = section.querySelectorAll('h3');

  createLink('h2', h2.innerText, h2.id);
  h3s.forEach(heading => createLink('h3', heading.innerText, heading.id));
});
