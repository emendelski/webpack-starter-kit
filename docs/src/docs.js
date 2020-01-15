import './docs.scss';

import 'prismjs';
import 'prismjs/plugins/unescaped-markup/prism-unescaped-markup';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';

// Simple class to hold menu node
class MenuNode {
  constructor(level, el) {
    this.level = level;
    this.children = [];
    this.el = el;
  }
}

const isInViewport = (elem, oT = 0, oB = 0) => {
  const ih = window.innerHeight || document.documentElement.clientHeight;
  const iw = window.innerWidth || document.documentElement.clientWidth;
  const {
    top,
    left,
    right,
    bottom,
  } = elem.getBoundingClientRect();

  return top >= 0 + oT && left >= 0 && bottom <= ih - oB && right <= iw;
};

const menuTree = (arr) => {
  const mostRecent = [null, null, null, null, null];
  mostRecent[0] = new MenuNode(0);

  arr.forEach((el) => {
    const { tagName } = el;
    const level = parseInt(tagName.charAt(1), 10);
    const node = new MenuNode(level, el);
    mostRecent[level] = node;

    let pLevel = level - 1;

    while (pLevel > 0 && mostRecent[pLevel] === null) {
      pLevel -= 1;
    }

    mostRecent[pLevel].children.push(node);
  });

  return mostRecent[0].children;
};

const menuToElement = (menu) => {
  const ul = document.createElement('ul');

  menu.forEach((item) => {
    const { id, innerHTML } = item.el;

    const li = document.createElement('li');
    const link = document.createElement('a');

    link.textContent = innerHTML;
    link.setAttribute('href', `#${id}`);
    link.classList.add('-docs-nav__link');

    li.appendChild(link);

    if (Object(item) === item) {
      li.appendChild(menuToElement(item.children));
    }

    ul.appendChild(li);
  });

  return ul;
};

const makeNavLinksSmooth = () => {
  const navLinks = document.querySelectorAll('.-docs-nav__link');

  navLinks.forEach((link) => link.addEventListener('click', (e) => {
    e.preventDefault();

    document.querySelector(link.hash).scrollIntoView({
      behavior: 'smooth',
    });
  }));
};

const spyScrolling = (elements) => {
  window.onscroll = () => {
    elements.forEach((el) => {
      const { id } = el;

      if (isInViewport(el, 0, 300)) {
        const active = document.querySelector('.-docs-nav__link.active');

        if (active) {
          active.classList.remove('active');
        }

        document.querySelector(`.-docs-nav__link[href*=${id}]`).classList.add('active');
      }
    });
  };
};

const nav = document.querySelector('[docs-nav]');
const headlines = document.querySelectorAll('h2[id], h3[id], h4[id], h5[id]');
const mn = menuToElement(menuTree(headlines));

mn.classList.add('-docs-nav__list');
nav.appendChild(mn);

makeNavLinksSmooth();
spyScrolling();
