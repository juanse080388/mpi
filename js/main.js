/* main.js
   Efectos globales:
   - preloader
   - menú responsive (hamburger) full screen semi-transparente desde derecha
   - scroll reveal (IntersectionObserver)
   - back-to-top button
   - actualizar año en footer
   - marcar link activo
   Vanilla JS, modular y comentado.
*/

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- PRELOADER ---------- */
  window.addEventListener('load', function () {
    document.body.classList.add('loaded');
    setTimeout(() => {
      const pre = document.getElementById('preloader');
      if (pre) pre.remove();
    }, 700);
  });

  /* ---------- MENU RESPONSIVE (hamburger full screen) ---------- */
  function setupMenu(btnId, navId) {
    const btn = document.getElementById(btnId);
    const nav = document.getElementById(navId);
    const fallbackBtn = document.querySelector('.btn-menu');
    const fallbackNav = document.querySelector('.main-nav');

    const menuBtn = btn || fallbackBtn;
    const menuNav = nav || fallbackNav;

    if (!menuBtn || !menuNav) return;

    function toggleMenu() {
      menuBtn.classList.toggle('open');
      menuNav.classList.toggle('show'); // clase 'show' controla el slide desde derecha
      const locked = menuNav.classList.contains('show');
      document.documentElement.style.overflow = locked ? 'hidden' : '';
      document.body.style.overflow = locked ? 'hidden' : '';
    }

    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // cerrar si se hace click fuera
    document.addEventListener('click', (e) => {
      if (!menuNav.contains(e.target) && !menuBtn.contains(e.target) && menuNav.classList.contains('show')) {
        toggleMenu();
      }
    });

    // cerrar con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuNav.classList.contains('show')) {
        toggleMenu();
      }
    });
  }

  // inicializa para todos tus HTML
  setupMenu('btn-menu', 'main-nav');
  setupMenu('btn-menu-2', 'main-nav-2');
  setupMenu('btn-menu-3', 'main-nav-3');
  setupMenu('btn-menu-4', 'main-nav-4');

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => obs.observe(el));
  }

  /* ---------- BACK TO TOP ---------- */
  const btnTop = document.getElementById('btn-top') || document.getElementById('btn-top-2') || document.getElementById('btn-top-3') || document.getElementById('btn-top-4');
  const showAt = 300;
  function handleScroll() {
    const y = window.scrollY || window.pageYOffset;
    if (btnTop) {
      btnTop.classList.toggle('show', y > showAt);
    }
    const header = document.querySelector('.site-header');
    if (header) {
      header.classList.toggle('scrolled', y > 20);
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  if (btnTop) btnTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- AÑO EN EL FOOTER ---------- */
  const years = document.querySelectorAll('#year, #year2, #year3, #year4');
  const y = new Date().getFullYear();
  years.forEach(el => { if (el) el.textContent = y; });

  /* ---------- ACTIVE LINK ---------- */
  const links = document.querySelectorAll('.main-nav .nav-link');
  links.forEach(a => {
    try {
      const href = new URL(a.href, location.href).pathname;
      const path = location.pathname.endsWith('/') ? location.pathname : location.pathname;
      if (href === path || href === path.split('/').pop()) a.classList.add('active');
    } catch (err) { /* ignore */ }
  });

});