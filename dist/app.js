const message = 'Olá! Encontrei o Chaveiro WS Rocha pelo site e gostaria de solicitar um atendimento.';
document.querySelectorAll('[data-whatsapp]').forEach(link => {
  link.href = 'https://wa.me/5519988150066?text=' + encodeURIComponent(link.dataset.message || message);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  if (!location.pathname.endsWith('/obrigado.html')) link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    setTimeout(() => { location.href = new URL('obrigado.html', document.querySelector('script[src$="app.js"]').src).href; }, 200);
  });
});
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
function closeMenu() {
  menu.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}
menuButton.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('is-open')) {closeMenu();menuButton.focus();}
});
document.addEventListener('click', event => {if (!event.target.closest('.header')) closeMenu();});
const header = document.querySelector('.header');
function updateHeader() {
  header.classList.toggle('is-scrolled', document.body.classList.contains('inner-page') || window.scrollY > 20);
}
window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('pageshow', updateHeader);
updateHeader();

const video = document.querySelector('.hero-video');
if (video) {
video.muted = true;
video.controls = false;
video.disablePictureInPicture = true;
function playBackgroundVideo() {
  video.play().catch(() => {
    // Browsers may block autoplay; retry on the next user interaction.
  });
}
playBackgroundVideo();
video.addEventListener('pause', () => {
  if (!document.hidden) playBackgroundVideo();
});
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) playBackgroundVideo();
});
document.addEventListener('pointerdown', playBackgroundVideo, { passive: true });
document.addEventListener('keydown', playBackgroundVideo);

}
