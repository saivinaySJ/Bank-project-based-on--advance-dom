'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
///////////////////////////////////////
// 1.
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Instead of using For loop , we use a advance method called forEach() method:
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//////////////////////////////////////
// 2.
// IMPLEMENTING SMOOTH SCROLLING:

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  // console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);
  // To see the current height and width of current viewPort:
  // console.log(
  //   'Height/Width of current viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // OLD WAY:
  // Scrolling:
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );
  // Smooth Scrolling:
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // MORE MODERN WAY:
  section1.scrollIntoView({ behavior: 'smooth' });
});
///////////////////////////////////////
// 3.
// EVENT DELEGATION:IMPLEENTING PAGE NAVIGATION:
// a.without using event delegation method:
/*
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
*/

// b.Now using event delegation method():
// --->Add event listener to common parent element
// --->Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy:
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// 4.
// BUILDING A TABBED component:

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // Guard clause
  if (!clicked) return;

  // Remove active tabs
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Active tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// 5.
// MENU FADE ANIMATIONS:

nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5;
  }
});

nav.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
});

///////////////////////////////////////
// 6.
// STICKY NAVIGATION:
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);

window.addEventListener('scroll', function () {
  console.log(window.scrollY);

  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

///////////////////////////////////////
// 7.
// REVEALING SECTIONS:
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


///////////////////////////////////////
// 8.
// Part-1
// BUILDING A SLIDER COMPONENT:
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
/*
// Selecting Elements:
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements:
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent='We use cookie for improved functionality and analytics';
message.innerHTML =
  'We use cookie for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true))

// header.before(message);
// header.after(message);

// Delete element:
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });
/*
// Example-2:
const footer = document.querySelector('.footer');
const buttonFooter = document.createElement('div');
buttonFooter.classList.add('btn-Footer');
buttonFooter.innerHTML =
  "click this button if you want to delete this button.<button class=' btn btn--footer'>Click me!</button>";
footer.append(buttonFooter);

document.querySelector('.btn--footer').addEventListener('click', function () {
  buttonFooter.remove();
});
*/
/*
// STYLES
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color);
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary','orangered')
// document.documentElement.style.setProperty('--color-secondary','blue')

// ATTRIBUTES:
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);
console.log(logo.id);

logo.alt = 'Beautiful.minimalist logo';
// Non-standard:
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'SJ Groups');

console.log(logo.src); //absolute url
console.log(logo.getAttribute('src')); //relative url


const twitter=document.querySelector('.twitter-link')
console.log(twitter.href);
console.log(twitter.getAttribute('href'));

const navlink=document.querySelector('.nav__link')
console.log(navlink.href);
console.log(navlink.getAttribute('href'));
*/

// This is for only practice purpose:

/*
Instant Transfer button:
const instantTransferButtonScroll = document.querySelector(
  '.operations__tab--1'
);
const section3 = document.querySelector('#section--3');

instantTransferButtonScroll.addEventListener('click', function () {
  const s2coords = section3.getBoundingClientRect();
  console.log(s2coords);

  section3.scrollIntoView({ behavior: 'smooth' });
});


// Instant loans:
const instantLoansScrollButton = document.querySelector('.operations__tab--2');
const section3 = document.querySelector('#section--3');
instantLoansScrollButton.addEventListener('click', function () {
  const s3coords = section3.getBoundingClientRect();
  console.log(s3coords);

  section3.scrollIntoView({ behavior: 'smooth' });
});



// TYPES OF EVENTS AND EVENT HANDLERS:
const h1 = document.querySelector('h1');
const alertH1 = function () {
  alert('addEventListeners: Great! You Are Reading The Heading.');
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 5000);
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You Are Reading The Heading.');
// };

// EVENT PROPAGATION IN PRACTICE:
// rgb(255,255,255)

const randomInt = (max, min) => Math.floor(Math.random() * (max - min) + min);
console.log(randomInt(2, 5));

const randoColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randoColor(0, 255));

// 1
document.querySelector('.nav__link').addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randoColor();
  console.log('LINK', e.target);
  // Stop propagation:
  // e.stopPropagation();
});

// 2
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randoColor();
  console.log('CONTAINER', e.target);
});

// 3
document.querySelector('nav').addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randoColor();
  console.log('NAV', e.target);
});


// DOM TRAVERSING:
const h1 = document.querySelector('h1');

// Going downwards:children
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards:parents
console.log(h1.parentNode);
h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways:siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
*/
