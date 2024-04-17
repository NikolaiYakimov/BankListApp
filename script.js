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
const header = document.querySelector('.header');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

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
  section1.scrollIntoView({ behavior: 'smooth' });
});
//////////////////////////////////////////////////////////////////////
//Cookies
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionality and analytics <button class= "btn btn--close-cookie">Got it</button>';
message.style.width = '120%';
message.style.backgroundColor = '#37383d';

// console.log(message);
setTimeout(() => {
  header.append(message);
  document
    .querySelector('.btn--close-cookie')
    .addEventListener('click', function () {
      message.remove();
    });
  message.style.height =
    Number.parseFloat(getComputedStyle(message).height, 10) + 20 + 'px';
}, 5000);

//////////////////////////////////////////////////////////////////////
//1 Add event listener to common parent element
//determinate what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
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

//lazy loading images

const imgTarget = document.querySelectorAll('img[data-src]');

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
