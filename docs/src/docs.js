import './docs.scss';

import 'prismjs';
import 'prismjs/plugins/unescaped-markup/prism-unescaped-markup';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';

const nav = document.querySelector('.-docs-js-nav');
const sections = document.querySelectorAll('.-docs-section');

const createLink = (type, name, target) => {
  const li = document.createElement('li');
  const link = document.createElement('a');

  link.innerText = name;
  link.setAttribute('href', `#${target}`);
  link.classList.add(`-docs-nav__link--${type}`, '-docs-nav__link');

  li.classList.add('-docs-nav__item');

  li.appendChild(link);
  nav.appendChild(li);
};

sections.forEach((section) => {
  const h2 = section.querySelector('.-docs-h2');
  const h3s = section.querySelectorAll('.-docs-h3');

  if (h2) createLink('h2', h2.innerText, h2.id);
  if (h3s.length) h3s.forEach(heading => createLink('h3', heading.innerText, heading.id));
});
