const $=(s,scope=document)=>scope.querySelector(s);
const $$=(s,scope=document)=>Array.from(scope.querySelectorAll(s));

const navToggle=$('.nav-toggle');
const navMenu=$('#navMenu');
const navActions=$('.nav-actions');
navToggle?.addEventListener('click',()=>{const expanded=navToggle.getAttribute('aria-expanded')==='true';navToggle.setAttribute('aria-expanded',String(!expanded));navMenu?.classList.toggle('open');navActions?.classList.toggle('open');});
$$('.nav-menu a').forEach(link=>link.addEventListener('click',()=>{navToggle?.setAttribute('aria-expanded','false');navMenu?.classList.remove('open');navActions?.classList.remove('open');}));

const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));

function prepHero(){
  const hero=$('.hero'), pin=$('.hero-pin');
  if(!hero||!pin)return;
  hero.classList.add('hero-scroll-sequence');
  pin.classList.add('hero-sequence-stage');
  const rain=document.createElement('div');
  rain.className='rain-layer';
  for(let i=0;i<70;i++){const s=document.createElement('span');s.className='rain-drop';s.style.left=(i*17%100)+'%';s.style.animationDelay=(i%11/10)+'s';rain.appendChild(s);}pin.appendChild(rain);
  const rainbow=document.createElement('div');rainbow.className='hero-rainbow';pin.appendChild(rainbow);
  const style=document.createElement('style');style.textContent='.hero.hero-scroll-sequence{height:220vh!important;min-height:1500px!important;overflow:visible!important}.hero-sequence-stage{position:sticky!important;top:0!important;height:100vh!important;min-height:760px!important;overflow:hidden!important}.rain-layer{position:absolute;inset:0;z-index:2;overflow:hidden;pointer-events:none}.rain-drop{position:absolute;top:-25%;width:2px;height:82px;background:linear-gradient(to bottom,rgba(255,255,255,0),rgba(255,255,255,.62));transform:rotate(12deg);animation:riseRain 1s linear infinite}@keyframes riseRain{to{transform:translateY(125vh) rotate(12deg)}}.hero-rainbow{position:absolute;left:50%;top:22%;width:min(560px,58vw);height:min(280px,30vw);transform:translateX(-50%) translateY(14px);opacity:0;border-radius:560px 560px 0 0;background:conic-gradient(from 180deg at 50% 100%,#ff5f6d 0deg,#ff9f1c 42deg,#ffd93d 84deg,#7bd88f 126deg,#4fc3f7 168deg,#7986ff 210deg,#c084fc 252deg,#ff5f6d 318deg,#ff5f6d 360deg);-webkit-mask:radial-gradient(circle at 50% 100%,transparent 54%,#000 55%);mask:radial-gradient(circle at 50% 100%,transparent 54%,#000 55%);z-index:2}.hero-sequence-complete .storm-bg,.hero-sequence-complete .dark-clouds,.hero-sequence-complete .light-clouds,.hero-sequence-complete .rain-layer,.hero-sequence-complete .hero-rainbow{opacity:0!important;pointer-events:none!important}.hero-logo-stage{z-index:4!important}.hero-photo-card{z-index:3!important}.hero-content{z-index:5!important}';document.head.appendChild(style);
}
prepHero();

let heroDone=false;
function initHeroAnimation(){
  const pin=$('.hero-pin');
  if(!pin||!window.gsap||!window.ScrollTrigger)return;
  gsap.registerPlugin(ScrollTrigger);
  const tl=gsap.timeline({defaults:{ease:'none'}});
  tl.to('.dark-clouds .cloud-1',{xPercent:-145,opacity:.15,duration:1},0)
    .to('.dark-clouds .cloud-2',{xPercent:145,opacity:.15,duration:1},0)
    .to('.dark-clouds .cloud-3',{xPercent:-125,opacity:.15,duration:1},.08)
    .to('.dark-clouds .cloud-4',{xPercent:125,opacity:.15,duration:1},.08)
    .to('.rain-layer',{opacity:.15,duration:1},.1)
    .to('.bright-bg',{opacity:1,duration:1},.25)
    .to('.light-clouds',{opacity:1,duration:1},.42)
    .to('.hero-rainbow',{opacity:.92,y:0,duration:.85},.62)
    .to('.hero-sun-mark',{opacity:1,y:0,scale:1,duration:.78,onStart:()=>$('.hero-sun-mark')?.classList.add('is-ready')},.95)
    .to('.logo-sun-glow',{opacity:1,scale:1.58,duration:.9},1.05)
    .to('.hero-rise-word',{opacity:1,y:0,duration:.72},1.32)
    .to('.hero-brand-subline',{opacity:1,y:0,duration:.5},1.52)
    .to(['.storm-bg','.dark-clouds','.light-clouds','.rain-layer','.hero-rainbow'],{opacity:0,duration:.75},1.98)
    .to('.hero-photo-card',{opacity:1,y:0,scale:1,duration:.9},2.14)
    .to('.sunbeam',{width:'58%',duration:.72},2.3)
    .to('.hero-copy',{opacity:1,y:0,duration:.68},2.42)
    .to('.hero-note',{opacity:1,y:0,duration:.62},2.5);
  ScrollTrigger.create({trigger:'.hero',start:'top top',end:'bottom bottom',animation:tl,scrub:1.05,onLeave:self=>{if(!heroDone){heroDone=true;tl.progress(1);pin.classList.add('hero-sequence-complete');self.disable(false);}}});
}
window.addEventListener('load',initHeroAnimation);

function initTrustCarousel(){const carousel=$('#trustCarousel'),track=$('#trustTrack');if(!carousel||!track)return;Array.from(track.children).forEach(card=>track.appendChild(card.cloneNode(true)));let currentX=0,isDragging=false,startX=0,velocity=0;const halfWidth=()=>track.scrollWidth/2;const render=()=>{if(!isDragging){currentX-=.36+velocity;velocity*=.92;if(Math.abs(velocity)<.015)velocity=0;}const width=halfWidth();if(width&&-currentX>=width)currentX=0;if(width&&currentX>0)currentX=-width+currentX;track.style.transform=`translate3d(${currentX}px,0,0)`;requestAnimationFrame(render);};requestAnimationFrame(render);const start=x=>{isDragging=true;carousel.classList.add('dragging');startX=x-currentX;velocity=0;};const move=x=>{if(!isDragging)return;const prev=currentX;currentX=x-startX;velocity=currentX-prev;};const end=()=>{isDragging=false;carousel.classList.remove('dragging');};carousel.addEventListener('pointerdown',e=>start(e.clientX));window.addEventListener('pointermove',e=>move(e.clientX));window.addEventListener('pointerup',end);}initTrustCarousel();
