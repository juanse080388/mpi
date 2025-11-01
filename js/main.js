// =======================
// PRELOADER
// =======================
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// =======================
// MENÚ HAMBURGUESA
// =======================
document.querySelectorAll('.btn-menu').forEach(btn => {
  btn.addEventListener('click', () => {
    const nav = btn.closest('.header-inner').querySelector('.main-nav');
    nav.classList.toggle('active');
    btn.classList.toggle('active');
  });
});

// Cerrar menú al hacer click en enlace
document.querySelectorAll('.main-nav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const nav = link.closest('.main-nav');
    const btn = nav.closest('.header-inner').querySelector('.btn-menu');
    if(nav.classList.contains('active')){
      nav.classList.remove('active');
      btn.classList.remove('active');
    }
  });
});

// =======================
// HEADER SCROLL SHADOW
// =======================
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if(window.scrollY > 40){
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// =======================
// BACK TO TOP
// =======================
const btnTop = document.querySelectorAll('.btn-top');
btnTop.forEach(btn => {
  window.addEventListener('scroll', () => {
    if(window.scrollY > 300){
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });
  
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// =======================
// FOOTER YEAR
// =======================
document.querySelectorAll('span[id^="year"]').forEach(span => {
  span.textContent = new Date().getFullYear();
});

// =======================
// SCROLL REVEAL
// =======================
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));