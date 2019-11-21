import './docs.scss';

import 'prismjs';
import 'prismjs/plugins/unescaped-markup/prism-unescaped-markup';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';

const nav = document.querySelector('.fldocs-js-nav');
const sections = document.querySelectorAll('.fldocs-section');

const createLink = (type, name, target) => {
  const li = document.createElement('li');
  const link = document.createElement('a');

  link.innerText = name;
  link.setAttribute('href', `#${target}`);
  link.classList.add(`fldocs-nav__link--${type}`, 'fldocs-nav__link');

  li.classList.add('fldocs-nav__item');

  li.appendChild(link);
  nav.appendChild(li);
};

sections.forEach((section) => {
  const h2 = section.querySelector('.fldocs-h2');
  const h3s = section.querySelectorAll('.fldocs-h3');

  if (h2) createLink('h2', h2.innerText, h2.id);
  if (h3s.length) h3s.forEach(heading => createLink('h3', heading.innerText, heading.id));
});
