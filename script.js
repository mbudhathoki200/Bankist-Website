'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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

//BUtton scrolling
btnScrollTo.addEventListener('click', function (e) {
  // const s1cords=section1.getBoundingClientRect();
  // console.log(s1cords);
  // console.log(e.target.getBoundingClientRect());
  //scrolling
  // window.scrollTo(s1cords.left+window.pageXOffset,s1cords.top+window.pageYOffset);
  // window.scrollTo({
  //   left:s1cords.left+window.pageXOffset,
  //   top:s1cords.top+window.pageYOffset,
  //   behavior:'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});
//Page Navigation(NAVBARS SMOOTH SCROLL)
// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click',function(e){
//     e.preventDefault();
//     const id=this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior:'smooth'});
//   })
// })
//1. Add Event listener to commmon parent element.
//2.Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //Matching stategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
//Tabbed Component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
tabsContainer.addEventListener('click', function (e) {
  // if(e.target.classList.contains('operations__tab')){
  //   console.log("GOT LINK");
  // }
  const clicked = e.target.closest('.operations__tab');
  //Guard Early
  if (!clicked) return;
  //Remove Active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  //Active tab
  clicked.classList.add('operations__tab--active');
  //Active Content Area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
//Manu Fade Animation
const nav = document.querySelector('.nav');
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
//Passing "arguments" into Handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//Sticky NAVIGATION
// const initialCoords=section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll',function(e){
//   console.log(window.scrollY);
//   if(window.scrollY>initialCoords.top){
//     nav.classList.add('sticky');
//   }else{
//     nav.classList.remove('sticky');
//   }
// });

//Sticky Naviagation:Interaction Obeserver API
// const obsCallback=function(entries,Observer){
//   entries.forEach(entry=>{
//     console.log(entry);
//   })
// };
// const obsOptions={
//   root:null,
//   threshold:[0,0.2]
// };

// const observer=new IntersectionObserver(obsCallback,obsOptions);
// observer.observe(section1);
//FInal STICKY NAV(REFACTORED)
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  // const [entry]=entries;
  const entry = entries[0];
  // console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
//Reveal Section
const allSelections = document.querySelectorAll('.section');
const RevealSection = function (entries, Observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  Observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(RevealSection, {
  root: null,
  threshold: 0.15,
});
allSelections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
//Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  //Replace src with data src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => imgObserver.observe(img));
//Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  const maxSlide = slides.length;

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

  const gotoSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  //NEXT SLIDE
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    gotoSlide(curSlide);
    activateDots(curSlide);
  };
  const prevSlide = function () {
    if (curSlide == 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    gotoSlide(curSlide);
    activateDots(curSlide);
  };

  const init = function () {
    gotoSlide(0);
    createDots();
    activateDots(0);
  };
  init();
  //Event Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  document.addEventListener('keydown', function (e) {
    if (e.key == 'ArrowLeft') prevSlide();
    if (e.key == 'ArrowRight') nextSlide();
  });
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      gotoSlide(slide);
      activateDots(curSlide);
    }
  });
};
slider();
// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('HTML Parsed and DOM tree built!!', e);
// });
// window.addEventListener('load', function (e) {
//   console.log('Page Fully Loaded', e);
// });
//TO send the dialog before exit
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });

//Events and  its handlers.
// const h1=document.querySelector('h1');
// const alert1=function(e){
//   alert('addEventListener:Great! YOu are reading a heading.');
//   // h1.removeEventListener('mouseenter',alert1);
// };
// // h1.onmouseenter=(e)=>{
// //   alert('addEventListener:Great!You are reading a heading.');
// // };
// h1.addEventListener('mouseenter',alert1);
// setTimeout(()=>{
//   h1.removeEventListener('mouseenter',alert1);
// },3000);

// //Selecting Elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);
// const header=document.querySelector('.header');
// const allSelections=document.querySelectorAll('.section');
// console.log(allSelections);
// console.log(document.getElementById('section--1'));
// const allButtons=document.getElementsByTagName('button');
// console.log(allButtons);
// console.log(document.getElementsByClassName('btn'));
// //Creating and inserting Elements
// //.insertAdjacentHtml
// const message=document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent='We use Cookie for improved fucntionality';
// message.innerHTML='We use Cookie for improved fucntionality <button class="btn btn-close-cookie">Got it!</button>';
// header.append(message);
// //Delete Elements
// document.querySelector('.btn-close-cookie').addEventListener('click',()=>message.remove());
// //Styling
// message.style.backgroundColor='#67384d';
// message.style.width='120%';
// console.log(message.style.backgroundColor);
// console.log(message.style.color);
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);
// message.style.height=Number.parseFloat(getComputedStyle(message).height,10) + 30 + 'px';
// document.documentElement.style.setProperty('--color-primary','orange');

// //Attributes
// const logo=document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);
// //Non Standard
// logo.setAttribute('designer','Manish');
// console.log(logo.getAttribute('designer'));

// //Classes
//Event Propagation
// rgb(255,255,255);
// const randomInt=(min,max)=>Math.floor(Math.random()*(max-min+1)+min);
// const randomColor=()=>`rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;
// document.querySelector('.nav__link').addEventListener('click',function(e){
//   this.style.backgroundColor=randomColor();
// document.querySelector('.nav__links').addEventListener('click',function(e){
//   this.style.backgroundColor=randomColor();
// })
// document.querySelector('.nav').addEventListener('click',function(e){
//   console.log('LINK',e.target,e.currentTarget);
// })

///Dom traversing
// const h1 = document.querySelector('h1');
//Goind Downwards:child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color='white';
// h1.lastElementChild.style.color='orange';
//Going Upwards:paraent
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest('.header').style.background='var(--gradient-secondary)';
// h1.closest('h1').style.background='var(--gradient-primary)';

//Going Sideways:sibling
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
// console.log(h1.parentElement.children);
