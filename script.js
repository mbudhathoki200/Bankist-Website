'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
const btnScrollTo=document.querySelector('.btn--scroll-to');
const section1=document.querySelector('#section--1'); 
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

