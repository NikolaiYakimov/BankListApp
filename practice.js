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
// window.scrollTo({
//   left:
//     document.querySelector(id).getBoundingClientRect().left +
//     window.pageXOffset,
//   top:
//     document.querySelector(id).getBoundingClientRect().top +
//     window.pageYOffset,
//   behavior: 'smooth',
// });

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
//Selecting elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// sectionsRevealing.observe(...allSections);

// .document.getElementById('section--1');
// const allButton = document.getElementsByTagName('button');
// // console.log(allButton);

// const anotherBtn = document.getElementsByClassName('btn');
// // console.log(anotherBtn);

//Creating and inserting elements
// insertAdjacentHTML;
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics';
// message.innerHTML =
//   'We use cookies for improved functionality and analytics <button class= "btn btn--close-cookie">Got it</button>';

// // header.prepend(message);

// setTimeout(() => header.append(message), 5000);
// header.append(message);
// header.append(message.cloneNode(true));
// header.after(message);

//Deleting element cookies

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//     // message.parentElement.removeChild(message);
//   });
// message.style.width = '120%';
// message.style.backgroundColor = '#37383d';
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

//Styles

// console.log(message.style.color);
// console.log(message.style.backgroundColor);

// console.log(getComputedStyle(message));
// console.log(getComputedStyle(message).color);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

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

// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('HEY HOW ARE YOU:', e);
// });

// window.addEventListener('load', function (e) {
//   console.log('LOADED:', e);
// });

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
