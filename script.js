const $=(s,scope=document)=>scope.querySelector(s);
const $$=(s,scope=document)=>Array.from(scope.querySelectorAll(s));

const navToggle=$('.nav-toggle');
const navMenu=$('#navMenu');
const navActions=$('.nav-actions');
navToggle?.addEventListener('click',()=>{const expanded=navToggle.getAttribute('aria-expanded')==='true';navToggle.setAttribute('aria-expanded',String(!expanded));navMenu?.classList.toggle('open');navActions?.classList.toggle('open');});
$$('.nav-menu a').forEach(link=>link.addEventListener('click',()=>{navToggle?.setAttribute('aria-expanded','false');navMenu?.classList.remove('open');navActions?.classList.remove('open');}));

const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));

function createRain(){const layer=$('.rain-layer');if(!layer||layer.children.length)return;for(let i=0;i<82;i++){const drop=document.createElement('span');drop.className='rain-drop';drop.style.left=`${Math.random()*100}%`;drop.style.animationDelay=`${Math.random()*1.2}s`;drop.style.animationDuration=`${.75+Math.random()*.55}s`;drop.style.opacity=`${.18+Math.random()*.42}`;layer.appendChild(drop);}}
createRain();

let heroDone=false;
function initHeroAnimation(){
  const hero=$('.hero');
  const pin=$('.hero-pin');
  if(!hero||!pin)return;
  if(!window.gsap||!window.ScrollTrigger||window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.body.classList.add('hero-ready');
    pin.classList.add('hero-sequence-complete');
    if(window.gsap){gsap.set(['.bright-bg','.hero-sun-mark','.hero-rise-wordmark','.hero-brand-subline','.hero-photo-card','.hero-copy','.hero-note'],{opacity:1,y:0,scale:1});gsap.set('.sunbeam',{width:'58%'});}
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  gsap.set(['.hero-sun-mark','.hero-rise-wordmark','.hero-brand-subline','.hero-photo-card','.hero-copy','.hero-note'],{opacity:0});
  gsap.set('.clear-weather',{opacity:0});
  gsap.set('.rainbow-img',{opacity:0,y:18});
  gsap.set('.sunbeam',{width:0});

  const tl=gsap.timeline({defaults:{ease:'none'}});
  tl.to('.storm-a',{xPercent:-92,yPercent:-8,opacity:.05,duration:1},0)
    .to('.storm-b',{xPercent:90,yPercent:-8,opacity:.05,duration:1},0)
    .to('.storm-c',{xPercent:-65,yPercent:12,opacity:.05,duration:1},.05)
    .to('.rain-layer',{opacity:.12,duration:1},.05)
    .to('.bright-bg',{opacity:1,duration:1},.18)
    .to('.clear-weather',{opacity:1,duration:.9},.32)
    .fromTo('.white-a',{xPercent:-20,opacity:0},{xPercent:0,opacity:.95,duration:.75},.42)
    .fromTo('.white-b',{xPercent:20,opacity:0},{xPercent:0,opacity:.95,duration:.75},.46)
    .to('.rainbow-img',{opacity:.95,y:0,duration:.7},.62)
    .to('.hero-sun-mark',{opacity:1,y:0,scale:1,duration:.75},.92)
    .to('.logo-sun-glow',{opacity:1,scale:1.6,duration:.85},1.02)
    .to('.hero-rise-wordmark',{opacity:1,y:0,duration:.7},1.28)
    .to('.hero-brand-subline',{opacity:1,y:0,duration:.45},1.48)
    .to(['.storm-bg','.storm-clouds','.clear-weather','.rain-layer'],{opacity:0,duration:.72},1.9)
    .to('.hero-photo-card',{opacity:1,y:0,scale:1,duration:.85},2.08)
    .to('.sunbeam',{width:'58%',duration:.7},2.25)
    .to('.hero-copy',{opacity:1,y:0,duration:.65},2.36)
    .to('.hero-note',{opacity:1,y:0,duration:.55},2.44);

  ScrollTrigger.create({trigger:'.hero',start:'top top',end:'bottom bottom',animation:tl,scrub:1.05,onLeave:self=>{if(!heroDone){heroDone=true;tl.progress(1);pin.classList.add('hero-sequence-complete');self.disable(false);}}});
}
window.addEventListener('load',initHeroAnimation);

function initTrustCarousel(){const carousel=$('#trustCarousel'),track=$('#trustTrack');if(!carousel||!track)return;Array.from(track.children).forEach(card=>track.appendChild(card.cloneNode(true)));let currentX=0,isDragging=false,startX=0,velocity=0;const halfWidth=()=>track.scrollWidth/2;const render=()=>{if(!isDragging){currentX-=.36+velocity;velocity*=.92;if(Math.abs(velocity)<.015)velocity=0;}const width=halfWidth();if(width&&-currentX>=width)currentX=0;if(width&&currentX>0)currentX=-width+currentX;track.style.transform=`translate3d(${currentX}px,0,0)`;requestAnimationFrame(render);};requestAnimationFrame(render);const start=x=>{isDragging=true;carousel.classList.add('dragging');startX=x-currentX;velocity=0;};const move=x=>{if(!isDragging)return;const previous=currentX;currentX=x-startX;velocity=currentX-previous;};const end=()=>{isDragging=false;carousel.classList.remove('dragging');};carousel.addEventListener('pointerdown',e=>start(e.clientX));window.addEventListener('pointermove',e=>move(e.clientX));window.addEventListener('pointerup',end);}initTrustCarousel();