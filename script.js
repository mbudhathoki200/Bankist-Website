'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo=document.querySelector('.btn--scroll-to');
const section1=document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn=>btn.addEventListener('click',openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//BUtton scrolling 
btnScrollTo.addEventListener('click',function(e){
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
  section1.scrollIntoView({behavior:'smooth'});
})
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
document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();
  //Matching stategy
  if(e.target.classList.contains('nav__link')){
    const id=e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  }
})
//Tabbed Component
const tabs=document.querySelectorAll('.operations__tab');
const tabsContainer=document.querySelector('.operations__tab-container');
const tabsContent=document.querySelectorAll('.operations__content');
tabsContainer.addEventListener('click',function(e){
  // if(e.target.classList.contains('operations__tab')){
  //   console.log("GOT LINK");
  // }
  const clicked=e.target.closest('.operations__tab');
  //Guard Early
  if(!clicked) return;
  //Remove Active classes
  tabs.forEach(t=>t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c=>c.classList.remove('operations__content--active'));
  //Active tab
  clicked.classList.add('operations__tab--active');
  //Active Content Area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

});
//Manu Fade Animation
const nav=document.querySelector('.nav');
const handleHover=function(e){
  if(e.target.classList.contains('nav__link')){
    const link=e.target;
    const siblings=link.closest('.nav').querySelectorAll('.nav__link');
    const logo=link.closest('.nav').querySelector('img');
    siblings.forEach(el=>{
      if(el!==link) el.style.opacity=this;
    });
    logo.style.opacity=this;
  }
}
//Passing "arguments" into Handler
nav.addEventListener('mouseover',handleHover.bind(0.5));
nav.addEventListener('mouseout',handleHover.bind(1));

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
const header=document.querySelector('.header');
const navHeight=nav.getBoundingClientRect().height;
const stickyNav=function(entries){
  // const [entry]=entries;
  const entry=entries[0];
  // console.log(entry);
  if(!entry.isIntersecting){
    nav.classList.add('sticky');
  }else{
    nav.classList.remove('sticky');
  }
}
const headerObserver=new IntersectionObserver(stickyNav,{
  root:null,
  threshold:0,
  rootMargin:`-${navHeight}px`,
});
headerObserver.observe(header);

//Events anda its handlers.
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
const h1=document.querySelector('h1');
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
