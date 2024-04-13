'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i <button btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
/////////////////////////////////////////
//Button scrolling

btnScroll.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  const s2coords = section2.getBoundingClientRect();
  // console.log(e.target.getBoundingClientRect());
  // console.log('Current scroll (X/Y): ', window.pageXOffset, window.pageYOffset);
  // console.log(
  //   'height/width viewport: ',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  //Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section2.scrollIntoView({ behavior: 'smooth' });
});
////////////////////////////////////////////////////////////
//Page navigation
//////////////////////////////////
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     // document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     window.scrollTo({
//       left:
//         document.querySelector(id).getBoundingClientRect().left +
//         window.pageXOffset,
//       top:
//         document.querySelector(id).getBoundingClientRect().top +
//         window.pageYOffset,
//       behavior: 'smooth',
//     });
//   });
// });
//1 Add event listener to common parent element
//determinate what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

    // window.scrollTo({
    //   left:
    //     document.querySelector(id).getBoundingClientRect().left +
    //     window.pageXOffset,
    //   top:
    //     document.querySelector(id).getBoundingClientRect().top +
    //     window.pageYOffset,
    //   behavior: 'smooth',
    // });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Tabbed component
tabContainer.addEventListener('click', function (e) {
  const clickedBut = e.target.closest('.operations__tab');
  //Guard clause
  if (!clickedBut) return;
  //Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabContent.forEach(e => e.classList.remove('operations__content--active'));

  //Active tab
  clickedBut.classList.add('operations__tab--active');

  //Active content area
  document
    .querySelector(`.operations__content--${clickedBut.dataset.tab}`)
    .classList.add('operations__content--active');
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Menu fade animation
const handHover = function (e, opacityA) {
  if (e.target.classList.contains('nav__link')) {
    const clicked = e.target;
    const siblings = clicked.closest('.nav').querySelectorAll('.nav__link');
    const logo = clicked.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== clicked) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};
//Passing argument into handler
nav.addEventListener('mouseover', handHover.bind(0.5));
nav.addEventListener('mouseout', handHover.bind(1));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Sticky navbar
// const initialCordinats = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCordinats.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

//Sticky navigation: Intersection Observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
// threshold: [0,0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const headerObserver = new IntersectionObserver(stickyNav, obsOptions);
headerObserver.observe(header);

//Reveal sections
const allSections = document.querySelectorAll('.section');
const revealFunction = function (entries, observer) {
  const [entry] = entries;
  ///////////////////////////////');
  // console.log(observer);
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserve = new IntersectionObserver(revealFunction, {
  root: null,
  threshold: 0.18,
});
allSections.forEach(el => {
  sectionObserve.observe(el);
  el.classList.add('section--hidden');
});
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
//lazy loading images

const imgTarget = document.querySelectorAll('img[data-src]');
console.log(imgTarget);

const loadImage = function (entries, observe) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //Replace src atr with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observe.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTarget.forEach(el => {
  imageObserver.observe(el);
});

//Slider functionality
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlide = slides.length;

  //Functions
  //Create dots
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDots = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  console.log(dotContainer);
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  //Next slide
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDots(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide == 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDots(currentSlide);
  };
  const init = function () {
    createDots();
    goToSlide(0);
    activateDots(0);
  };
  init();
  //Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDots(slide);
      // e.target.classList.add('dots__dot--active');
    }
  });
};
slider();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Selecting elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// sectionsRevealing.observe(...allSections);

// .document.getElementById('section--1');
const allButton = document.getElementsByTagName('button');
// console.log(allButton);

const anotherBtn = document.getElementsByClassName('btn');
// console.log(anotherBtn);

//Creating and inserting elements
// insertAdjacentHTML;
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics <button class= "btn btn--close-cookie">Got it</button>';

header.prepend(message);

// setTimeout(() => header.append(message), 5000);
// header.append(message);
// header.append(message.cloneNode(true));
header.after(message);

//Deleting elements

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // message.parentElement.removeChild(message);
  });

//Styles
message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.color);
// console.log(message.style.backgroundColor);

// console.log(getComputedStyle(message));
// console.log(getComputedStyle(message).color);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);
// logo.alt = 'Beautiful logo';

// //Non-standard
// console.log(logo.getAttribute('designer'));
// console.log(logo.designer);
// logo.setAttribute('company', 'BankApp');

// console.log(logo.getAttribute('src'));

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// console.log(logo.dataset.versionNumber);

// logo.classList.add('b', 'c');
// logo.classList.remove('b', 'c');
// logo.classList.toggle('b', 'c');
// logo.classList.contains('b', 'c');
// //Dont use this
// logo.className = 'Yakimov';

// const btnScroll = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');
// const section2 = document.querySelector('#section--2');

// btnScroll.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   const s2coords = section2.getBoundingClientRect();
//   // console.log(e.target.getBoundingClientRect());
//   // console.log('Current scroll (X/Y): ', window.pageXOffset, window.pageYOffset);
//   // console.log(
//   //   'height/width viewport: ',
//   //   document.documentElement.clientHeight,
//   //   document.documentElement.clientWidth
//   // );

//   //Scrolling
//   // window.scrollTo(
//   //   s1coords.left + window.pageXOffset,
//   //   s1coords.top + window.pageYOffset
//   // );
//   // window.scrollTo({
//   //   left: s1coords.left + window.pageXOffset,
//   //   top: s1coords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });

//   section2.scrollIntoView({ behavior: 'smooth' });
// });

// const h1 = document.querySelector('h1');
// const alertH1 = function (e) {
//   alert('addEventLister: Great! You are reding the heading ');
//   // h1.removeEventListener('mouseenter', alertH1);
// };
// h1.addEventListener('mouseenter', alertH1);
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 10000);

// h1.onmouseenter = function (e) {
//   alert('on-mouseenter: Helooo');
// };

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Link :', e.target, e.currentTarget);
//   // e.stopPropagation();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Container :', e.target, e.currentTarget);
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('nav :', e.target, e.currentTarget);
// });

// const h1 = document.querySelector('h1');

// //Going down: selecting child element

// console.log(h1.querySelectorAll('highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);

// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'white';

// //Going upwards:parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.backgroundColor = 'orange';

// //Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) {
//     el.style.transform = 'scale(0.5)';
//   }
// });

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HEY HOW ARE YOU:', e);
});

window.addEventListener('load', function (e) {
  console.log('LOADED:', e);
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
