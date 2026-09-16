const message = 'Olá! Encontrei o Chaveiro WS Rocha pelo site e gostaria de solicitar um atendimento.';
document.querySelectorAll('[data-whatsapp]').forEach(link => {
  link.href = 'https://wa.me/5519988150066?text=' + encodeURIComponent(message);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
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
const video = document.querySelector('.hero-video');
const videoButton = document.querySelector('.video-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let userPaused = reducedMotion.matches || Boolean(navigator.connection?.saveData);
function updateVideoButton() {
  videoButton.textContent = video.paused ? 'Reproduzir vídeo' : 'Pausar vídeo';
  videoButton.setAttribute('aria-label', video.paused ? 'Reproduzir vídeo de fundo' : 'Pausar vídeo de fundo');
  videoButton.setAttribute('aria-pressed', String(video.paused));
}
video.muted = true;
if (userPaused) {video.pause();video.removeAttribute('autoplay');}
else video.play().catch(updateVideoButton);
video.addEventListener('play', updateVideoButton);
video.addEventListener('pause', updateVideoButton);
videoButton.addEventListener('click', () => {
  userPaused = !video.paused;
  if (video.paused) {video.style.visibility = 'visible';video.play().catch(updateVideoButton);} else video.pause();
});
reducedMotion.addEventListener('change', event => {if (event.matches) {userPaused = true;video.pause();}});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) video.pause();
  else if (!userPaused) video.play().catch(updateVideoButton);
});
updateVideoButton();
