const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

function setupEnhancedHero() {
  const hero = $('.hero');
  const pin = $('.hero-pin');
  const stage = $('.hero-logo-stage');
  if (!hero || !pin || !stage) return;

  hero.classList.add('hero-cinematic');
  pin.classList.add('hero-sequence-stage');

  if (!$('.rain-layer')) {
    const rain = document.createElement('div');
    rain.className = 'rain-layer';
    for (let i = 0; i < 76; i++) {
      const drop = document.createElement('span');
      drop.className = 'rain-drop';
      drop.style.left = `${Math.random() * 100}%`;
      drop.style.animationDelay = `${Math.random() * 1.2}s`;
      drop.style.animationDuration = `${0.78 + Math.random() * 0.48}s`;
      drop.style.opacity = `${0.18 + Math.random() * 0.42}`;
      rain.appendChild(drop);
    }
    pin.appendChild(rain);
  }

  if (!$('.hero-rainbow')) {
    const rainbow = document.createElement('div');
    rainbow.className = 'hero-rainbow';
    pin.appendChild(rainbow);
  }

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

  if (!$('#cinematicHeroOverride')) {
    const style = document.createElement('style');
    style.id = 'cinematicHeroOverride';
    style.textContent = `
      .hero.hero-cinematic{height:100vh!important;min-height:780px!important;position:relative!important;overflow:hidden!important}.hero-sequence-stage{position:relative!important;top:auto!important;height:100%!important;min-height:780px!important;overflow:hidden!important;background:linear-gradient(180deg,#596773 0%,#87939c 38%,#dce9ef 72%,#fffaf2 100%)!important}.hero-logo-stage{position:absolute;inset:0;display:flex!important;flex-direction:column;align-items:center;justify-content:center;gap:.68rem;pointer-events:none;text-align:center;z-index:4}.hero-logo{display:none!important}.hero-sun-mark{width:min(245px,34vw);opacity:0;transform:translateY(16px) scale(.72);filter:drop-shadow(0 22px 46px rgba(253,186,33,.28));position:relative;z-index:2}.hero-sun-mark svg{width:100%;height:auto;display:block}.hero-rise-word{font-family:"League Spartan",Montserrat,sans-serif;font-size:clamp(4.5rem,9vw,8.8rem);font-weight:800;line-height:.82;letter-spacing:.16em;text-indent:.16em;color:var(--navy);opacity:0;transform:translateY(18px);text-shadow:0 18px 42px rgba(38,70,83,.16)}.hero-brand-subline{font-weight:900;letter-spacing:.18em;text-transform:uppercase;color:var(--text);font-size:clamp(.82rem,1.6vw,1.15rem);opacity:0;transform:translateY(12px)}.logo-sun-glow{position:absolute;left:50%!important;top:43%!important;width:300px!important;height:300px!important;transform:translate(-50%,-50%) scale(.45);border-radius:50%;background:radial-gradient(circle,rgba(253,186,33,.95),rgba(253,186,33,.26) 45%,rgba(253,186,33,0) 72%);opacity:0;z-index:1}.rain-layer{position:absolute;inset:0;z-index:2;overflow:hidden;pointer-events:none}.rain-drop{position:absolute;top:-25%;width:2px;height:82px;background:linear-gradient(to bottom,rgba(255,255,255,0),rgba(255,255,255,.62));transform:rotate(12deg);animation:riseRain 1s linear infinite}@keyframes riseRain{to{transform:translateY(125vh) rotate(12deg)}}.hero-rainbow{position:absolute;left:50%;top:22%;width:min(560px,58vw);height:min(280px,30vw);transform:translateX(-50%) translateY(14px);opacity:0;border-radius:560px 560px 0 0;background:conic-gradient(from 180deg at 50% 100%,#ff5f6d 0deg,#ff9f1c 42deg,#ffd93d 84deg,#7bd88f 126deg,#4fc3f7 168deg,#7986ff 210deg,#c084fc 252deg,#ff5f6d 318deg,#ff5f6d 360deg);-webkit-mask:radial-gradient(circle at 50% 100%,transparent 54%,#000 55%);mask:radial-gradient(circle at 50% 100%,transparent 54%,#000 55%);z-index:2}.sun-core-path{stroke-dasharray:1200;stroke-dashoffset:1200}.hero-sun-mark.is-ready .sun-core-path{animation:drawRiseSun 1.15s ease forwards}.hero-sun-mark.is-ready .sun-ray-group{transform-origin:84px 72px;animation:riseSunPulse 2.6s ease-in-out infinite}@keyframes drawRiseSun{to{stroke-dashoffset:0}}@keyframes riseSunPulse{50%{transform:scale(1.055);filter:drop-shadow(0 0 15px rgba(253,186,33,.75))}}.hero-photo-card{z-index:3!important}.hero-content{z-index:5!important}.hero-copy,.hero-note{opacity:0;transform:translateY(18px)}.hero-sequence-complete .storm-bg,.hero-sequence-complete .dark-clouds,.hero-sequence-complete .light-clouds,.hero-sequence-complete .rain-layer,.hero-sequence-complete .hero-rainbow{opacity:0!important;pointer-events:none!important}@media(max-width:720px){.hero.hero-cinematic{min-height:760px!important}.hero-sun-mark{width:min(210px,48vw)}.hero-rise-word{font-size:clamp(4rem,18vw,6rem)}.logo-sun-glow{width:235px!important;height:235px!important}.hero-rainbow{width:78vw;height:39vw}}@media(prefers-reduced-motion:reduce){.hero-sun-mark,.hero-rise-word,.hero-brand-subline,.hero-photo-card,.hero-copy,.hero-note{opacity:1!important;transform:none!important}.sun-core-path,.sun-ray-group,.rain-drop{animation:none!important}.rain-layer,.hero-rainbow{display:none!important}}
    `;
    document.head.appendChild(style);
  }
}
setupEnhancedHero();

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

let riseHeroPlayedThisVisit = false;
function initHeroAnimation() {
  const pin = $('.hero-pin');
  if (!pin || riseHeroPlayedThisVisit) return;
  riseHeroPlayedThisVisit = true;

  if (!window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    $('.hero-sun-mark')?.classList.add('is-ready');
    pin.classList.add('hero-sequence-complete');
    if (window.gsap) gsap.set(['.hero-sun-mark','.hero-rise-word','.hero-brand-subline','.hero-photo-card','.hero-copy','.hero-note'], { opacity: 1, y: 0, scale: 1 });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' }, onComplete: () => pin.classList.add('hero-sequence-complete') });

  tl.to('.dark-clouds .cloud-1', { xPercent: -145, opacity: .15, duration: 1.05 }, 0)
    .to('.dark-clouds .cloud-2', { xPercent: 145, opacity: .15, duration: 1.05 }, 0)
    .to('.dark-clouds .cloud-3', { xPercent: -125, opacity: .15, duration: 1.05 }, .08)
    .to('.dark-clouds .cloud-4', { xPercent: 125, opacity: .15, duration: 1.05 }, .08)
    .to('.rain-layer', { opacity: .15, duration: 1.0 }, .1)
    .to('.bright-bg', { opacity: 1, duration: 1.05 }, .25)
    .to('.light-clouds', { opacity: 1, duration: .95 }, .42)
    .to('.hero-rainbow', { opacity: .92, y: 0, duration: .85 }, .62)
    .to('.hero-sun-mark', { opacity: 1, y: 0, scale: 1, duration: .78, onStart: () => $('.hero-sun-mark')?.classList.add('is-ready') }, .95)
    .to('.logo-sun-glow', { opacity: 1, scale: 1.58, duration: .9 }, 1.05)
    .to('.hero-rise-word', { opacity: 1, y: 0, duration: .72 }, 1.32)
    .to('.hero-brand-subline', { opacity: 1, y: 0, duration: .5 }, 1.52)
    .to(['.storm-bg','.dark-clouds','.light-clouds','.rain-layer','.hero-rainbow'], { opacity: 0, duration: .75 }, 1.98)
    .to('.hero-photo-card', { opacity: 1, y: 0, scale: 1, duration: .9 }, 2.14)
    .to('.sunbeam', { width: '58%', duration: .72 }, 2.3)
    .to('.hero-copy', { opacity: 1, y: 0, duration: .68 }, 2.42)
    .to('.hero-note', { opacity: 1, y: 0, duration: .62 }, 2.5);
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
