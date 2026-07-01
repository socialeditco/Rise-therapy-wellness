const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const navToggle = $('.nav-toggle');
const navMenu = $('#navMenu');
const navActions = $('.nav-actions');
navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navMenu?.classList.toggle('open');
  navActions?.classList.toggle('open');
});
$$('.nav-menu a').forEach(link => link.addEventListener('click', () => {
  navToggle?.setAttribute('aria-expanded', 'false');
  navMenu?.classList.remove('open');
  navActions?.classList.remove('open');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
$$('.reveal').forEach(el => observer.observe(el));

function initHeroAnimation() {
  if (!window.gsap || !window.ScrollTrigger || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.registerPlugin(ScrollTrigger);
  const tl = gsap.timeline({
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: 1.05 }
  });
  tl.to('.dark-clouds .cloud-1', { xPercent: -145, opacity: 0, duration: 1 }, 0)
    .to('.dark-clouds .cloud-2', { xPercent: 145, opacity: 0, duration: 1 }, 0)
    .to('.dark-clouds .cloud-3', { xPercent: -125, opacity: 0, duration: 1 }, 0.08)
    .to('.dark-clouds .cloud-4', { xPercent: 125, opacity: 0, duration: 1 }, 0.08)
    .to('.bright-bg', { opacity: 1, duration: 1.1 }, 0.12)
    .to('.light-clouds', { opacity: 1, duration: 1 }, 0.35)
    .to('.hero-logo', { opacity: 1, y: 0, scale: 1, duration: 0.85 }, 0.55)
    .to('.logo-sun-glow', { opacity: 1, scale: 1.55, duration: 0.9 }, 0.78)
    .to('.hero-photo-card', { opacity: 1, y: 0, scale: 1, duration: 0.95 }, 1.04)
    .to('.sunbeam', { width: '58%', duration: 0.75 }, 1.16)
    .to('.hero-copy', { opacity: 1, y: 0, duration: 0.7 }, 1.24)
    .to('.hero-note', { opacity: 1, y: 0, duration: 0.65 }, 1.32)
    .to('.hero-logo-stage', { yPercent: -6, scale: 0.9, duration: 0.7 }, 1.85)
    .to('.hero-copy', { yPercent: -5, duration: 0.7 }, 1.85);
}
window.addEventListener('load', initHeroAnimation);

function initTrustCarousel() {
  const carousel = $('#trustCarousel');
  const track = $('#trustTrack');
  if (!carousel || !track) return;
  Array.from(track.children).forEach(card => track.appendChild(card.cloneNode(true)));
  let currentX = 0;
  let isDragging = false;
  let startX = 0;
  let velocity = 0;
  const halfWidth = () => track.scrollWidth / 2;
  const render = () => {
    if (!isDragging) {
      currentX -= 0.36 + velocity;
      velocity *= 0.92;
      if (Math.abs(velocity) < 0.015) velocity = 0;
    }
    const width = halfWidth();
    if (width && -currentX >= width) currentX = 0;
    if (width && currentX > 0) currentX = -width + currentX;
    track.style.transform = `translate3d(${currentX}px,0,0)`;
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
  const startDrag = x => { isDragging = true; carousel.classList.add('dragging'); startX = x - currentX; velocity = 0; };
  const moveDrag = x => { if (!isDragging) return; const previous = currentX; currentX = x - startX; velocity = currentX - previous; };
  const endDrag = () => { isDragging = false; carousel.classList.remove('dragging'); };
  carousel.addEventListener('pointerdown', event => startDrag(event.clientX));
  window.addEventListener('pointermove', event => moveDrag(event.clientX));
  window.addEventListener('pointerup', endDrag);
}
initTrustCarousel();
