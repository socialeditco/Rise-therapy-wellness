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
    if(window.gsap){
      gsap.set(['.bright-bg','.hero-photo-card','.hero-copy'],{opacity:1,y:0,scale:1});
      gsap.set(['.hero-logo-stage','.storm-clouds','.clear-weather','.rain-layer'],{opacity:0});
      gsap.set('.sunbeam',{width:'58%'});
    }
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  gsap.set(['.hero-sun-mark','.hero-rise-wordmark','.hero-brand-subline','.hero-photo-card','.hero-copy'],{opacity:0});
  gsap.set('.logo-sun-glow',{opacity:0,scale:.45});
  gsap.set('.clear-weather',{opacity:0});
  gsap.set('.rainbow-img',{opacity:0,y:18});
  gsap.set('.sunbeam',{width:0});
  const tl=gsap.timeline({defaults:{ease:'none'}});
  tl.to('.storm-a',{xPercent:-100,yPercent:-10,opacity:.08,duration:1.4},0)
    .to('.storm-b',{xPercent:96,yPercent:-10,opacity:.08,duration:1.4},0)
    .to('.rain-layer',{opacity:.16,duration:1.2},.05)
    .to('.bright-bg',{opacity:1,duration:1.3},.35)
    .to('.clear-weather',{opacity:1,duration:1.25},.72)
    .fromTo('.white-a',{xPercent:-24,opacity:0},{xPercent:0,opacity:.95,duration:1.05},.9)
    .fromTo('.white-b',{xPercent:24,opacity:0},{xPercent:0,opacity:.95,duration:1.05},1.0)
    .to('.rainbow-img',{opacity:.95,y:0,duration:1.2},1.35)
    .to('.hero-sun-mark',{opacity:1,y:0,scale:1,duration:1.05},1.9)
    .to('.logo-sun-glow',{opacity:1,scale:1.62,duration:1.1},2.05)
    .to('.hero-rise-wordmark',{opacity:1,y:0,duration:.95},2.55)
    .to('.hero-brand-subline',{opacity:1,y:0,duration:.72},2.95)
    .to(['.hero-sun-mark','.hero-rise-wordmark','.hero-brand-subline','.logo-sun-glow'],{opacity:0,duration:.95},4.0)
    .to(['.storm-bg','.storm-clouds','.clear-weather','.rain-layer'],{opacity:0,duration:.95},4.0)
    .to('.hero-photo-card',{opacity:1,y:0,scale:1,duration:1.05},4.55)
    .to('.sunbeam',{width:'58%',duration:.9},4.85)
    .to('.hero-copy',{opacity:1,y:0,duration:.85},5.25);
  ScrollTrigger.create({trigger:'.hero',start:'top top',end:'bottom bottom',animation:tl,scrub:1.25,onLeave:self=>{if(!heroDone){heroDone=true;tl.progress(1);pin.classList.add('hero-sequence-complete');self.disable(false);}}});
}
window.addEventListener('load',initHeroAnimation);

function initTrustCarousel(){const carousel=$('#trustCarousel'),track=$('#trustTrack');if(!carousel||!track)return;Array.from(track.children).forEach(card=>track.appendChild(card.cloneNode(true)));let currentX=0,isDragging=false,startX=0,velocity=0;const halfWidth=()=>track.scrollWidth/2;const render=()=>{if(!isDragging){currentX-=.36+velocity;velocity*=.92;if(Math.abs(velocity)<.015)velocity=0;}const width=halfWidth();if(width&&-currentX>=width)currentX=0;if(width&&currentX>0)currentX=-width+currentX;track.style.transform=`translate3d(${currentX}px,0,0)`;requestAnimationFrame(render);};requestAnimationFrame(render);const start=x=>{isDragging=true;carousel.classList.add('dragging');startX=x-currentX;velocity=0;};const move=x=>{if(!isDragging)return;const previous=currentX;currentX=x-startX;velocity=currentX-previous;};const end=()=>{isDragging=false;carousel.classList.remove('dragging');};carousel.addEventListener('pointerdown',e=>start(e.clientX));window.addEventListener('pointermove',e=>move(e.clientX));window.addEventListener('pointerup',end);}initTrustCarousel();

function initPrototypeBubbles(){
  const pop=$('#demoPop');
  if(!pop)return;
  const titleEl=$('strong',pop), textEl=$('p',pop);
  let timer;
  const hide=()=>pop.classList.remove('active');
  $$('.bubble-link').forEach(link=>{
    link.addEventListener('click',event=>{
      event.preventDefault();
      clearTimeout(timer);
      const rect=link.getBoundingClientRect();
      const title=link.dataset.bubbleTitle||'Prototype link';
      const text=link.dataset.bubble||'In the finished website, this would route visitors to the appropriate page or workflow.';
      titleEl.textContent=title;
      textEl.textContent=text;
      const x=Math.min(Math.max(rect.left+rect.width/2,210),window.innerWidth-210);
      const y=Math.max(rect.top+window.scrollY-12,window.scrollY+90);
      pop.style.left=`${x}px`;
      pop.style.top=`${y}px`;
      pop.classList.add('active');
      const href=link.getAttribute('href')||'';
      if(href.startsWith('#')&&href.length>1){
        const target=$(href);
        if(target){setTimeout(()=>target.scrollIntoView({behavior:'smooth',block:'start'}),420);}
      }
      timer=setTimeout(hide,5200);
    });
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape')hide();});
  document.addEventListener('click',event=>{if(!event.target.closest('.bubble-link')&&!event.target.closest('#demoPop'))hide();});
}
initPrototypeBubbles();