// document.addEventListener('DOMContentLoaded', () => {
//   const nav = document.querySelector('nav');
//   const menuToggler = document.querySelector('.menu-toggler');
//   const navList = document.querySelector('.nav-list');

//   menuToggler.addEventListener('click', () => {
//     menuToggler.classList.toggle('open'); 
//     navList.classList.toggle('active'); 
//   });

//   navList.querySelectorAll('a').forEach(link => {
//     link.addEventListener('click', () => {
//       if (navList.classList.contains('active')) {
//         menuToggler.classList.remove('open');
//         navList.classList.remove('active');
//       }
//     });
//   });
// });