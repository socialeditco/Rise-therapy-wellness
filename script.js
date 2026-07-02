const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

function setupSunFirstHero() {
  const stage = $('.hero-logo-stage');
  if (!stage) return;

  stage.innerHTML = `
    <div class="logo-sun-glow"></div>
    <div class="hero-sun-mark" aria-hidden="true">
      <svg viewBox="0 0 168 148" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g class="sun-core-paths" transform="translate(10 8)">
          <path class="sun-core-path" d="M58 60c-1-15 13-28 29-23 18 6 21 31 5 43-19 15-49 4-55-23-6-29 15-58 47-62 35-4 66 22 71 59 6 45-29 84-74 85" stroke="#FDBA21" stroke-width="9" stroke-linecap="round"/>
          <path class="sun-core-path" d="M58 60c1-6 7-10 13-9 8 2 11 12 6 18-7 9-23 7-29-4-8-16 1-36 20-42 22-7 45 8 50 31 6 29-15 57-46 60" stroke="#FDBA21" stroke-width="9" stroke-linecap="round"/>
          <g class="sun-ray-group" stroke="#F15A24" stroke-width="10" stroke-linecap="round">
            <path d="M74 4V24"/><path d="M105 12l-9 19"/><path d="M130 31l-16 12"/><path d="M146 59l-20 4"/><path d="M142 91l-19-8"/><path d="M121 116l-12-16"/><path d="M43 8l8 19"/><path d="M17 29l16 13"/><path d="M2 58l20 5"/><path d="M7 90l19-8"/><path d="M29 115l12-16"/>
          </g>
        </g>
      </svg>
    </div>
    <div class="hero-rise-word" aria-hidden="true">RISE</div>
    <div class="hero-brand-subline" aria-hidden="true">THERAPY &amp; WELLNESS</div>
  `;

  if (!$('#sunHeroOverride')) {
    const style = document.createElement('style');
    style.id = 'sunHeroOverride';
    style.textContent = `
      .hero-logo-stage{position:absolute;inset:0;display:flex!important;flex-direction:column;align-items:center;justify-content:center;gap:.7rem;pointer-events:none;text-align:center;z-index:2}.hero-logo{display:none!important}.hero-sun-mark{width:min(245px,34vw);opacity:0;transform:translateY(16px) scale(.72);filter:drop-shadow(0 22px 46px rgba(253,186,33,.28));position:relative;z-index:2}.hero-sun-mark svg{width:100%;height:auto;display:block}.hero-rise-word{font-family:"League Spartan",Montserrat,sans-serif;font-size:clamp(4.5rem,9vw,8.8rem);font-weight:800;line-height:.82;letter-spacing:.16em;text-indent:.16em;color:var(--navy);opacity:0;transform:translateY(18px);text-shadow:0 18px 42px rgba(38,70,83,.16)}.hero-brand-subline{font-weight:900;letter-spacing:.18em;text-transform:uppercase;color:var(--text);font-size:clamp(.82rem,1.6vw,1.15rem);opacity:0;transform:translateY(12px)}.logo-sun-glow{left:50%!important;top:43%!important;width:300px!important;height:300px!important;z-index:1}.hero-photo-card{z-index:3}.hero-content{z-index:4}.sun-core-path{stroke-dasharray:1200;stroke-dashoffset:1200}.hero-sun-mark.is-ready .sun-core-path{animation:drawRiseSun 1.15s ease forwards}.hero-sun-mark.is-ready .sun-ray-group{transform-origin:84px 72px;animation:riseSunPulse 2.6s ease-in-out infinite}@keyframes drawRiseSun{to{stroke-dashoffset:0}}@keyframes riseSunPulse{50%{transform:scale(1.055);filter:drop-shadow(0 0 15px rgba(253,186,33,.75))}}@media(max-width:720px){.hero-sun-mark{width:min(210px,48vw)}.hero-rise-word{font-size:clamp(4rem,18vw,6rem)}.logo-sun-glow{width:235px!important;height:235px!important}}@media(prefers-reduced-motion:reduce){.hero-sun-mark,.hero-rise-word,.hero-brand-subline{opacity:1!important;transform:none!important}.sun-core-path,.sun-ray-group{animation:none!important}}
    `;
    document.head.appendChild(style);
  }
}
setupSunFirstHero();

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
    .to('.hero-sun-mark', { opacity: 1, y: 0, scale: 1, duration: 0.85, onStart: () => $('.hero-sun-mark')?.classList.add('is-ready') }, 0.55)
    .to('.logo-sun-glow', { opacity: 1, scale: 1.58, duration: 0.9 }, 0.72)
    .to('.hero-rise-word', { opacity: 1, y: 0, duration: 0.7 }, 0.95)
    .to('.hero-brand-subline', { opacity: 1, y: 0, duration: 0.55 }, 1.08)
    .to('.hero-photo-card', { opacity: 1, y: 0, scale: 1, duration: 0.95 }, 1.24)
    .to('.sunbeam', { width: '58%', duration: 0.75 }, 1.36)
    .to('.hero-copy', { opacity: 1, y: 0, duration: 0.7 }, 1.42)
    .to('.hero-note', { opacity: 1, y: 0, duration: 0.65 }, 1.52)
    .to('.hero-logo-stage', { yPercent: -6, scale: 0.9, duration: 0.7 }, 1.92)
    .to('.hero-copy', { yPercent: -5, duration: 0.7 }, 1.92);
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
