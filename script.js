
const nav = document.getElementById('navbar');

window.onscroll = function() {
  
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
};
