/* lightbox.js
   Lightbox simple y accesible:
   - soporta imágenes (data-type="image" o <img> click)
   - soporta videos (elementos .video-card con data-video = embed URL)
   - cerrar con botón, click fuera o ESC
   - bloquea scroll cuando está abierto
*/

document.addEventListener('DOMContentLoaded', function () {
  const lightbox = document.getElementById('lightbox');
  const inner = document.getElementById('lightbox-inner');
  const closeBtn = document.getElementById('lightbox-close');

  if (!lightbox || !inner) return;

  // abrir imagen
  function openImage(src, alt = '') {
    inner.innerHTML = ''; // limpiar
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.loading = 'lazy';
    inner.appendChild(img);
    showLightbox();
  }

  // abrir video (embed URL, por ejemplo YouTube embed)
  function openVideo(embedUrl) {
    inner.innerHTML = '';
    // build iframe with autoplay=1 & modestbranding param if YouTube
    let sep = embedUrl.includes('?') ? '&' : '?';
    const autoplayUrl = embedUrl + sep + 'autoplay=1';
    const iframe = document.createElement('iframe');
    iframe.src = autoplayUrl;
    iframe.allow = 'autoplay; fullscreen';
    iframe.setAttribute('allowfullscreen', '');
    inner.appendChild(iframe);
    showLightbox();
  }

  function showLightbox() {
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
    // bloquear scroll
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
    // restaurar scroll
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    // limpiar contenido luego de la animación
    setTimeout(() => { inner.innerHTML = ''; }, 300);
  }

  // click en imágenes de galería
  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', (e) => {
      const src = img.getAttribute('src');
      const alt = img.getAttribute('alt') || '';
      openImage(src, alt);
    });
  });

  // click en tarjetas de video
  document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const videoUrl = card.dataset.video;
      if (!videoUrl) return;
      openVideo(videoUrl);
    });
  });

  // cerrar en botón
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  // cerrar si clic en fondo (no en inner content)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
});