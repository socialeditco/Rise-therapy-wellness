const $=(s,scope=document)=>scope.querySelector(s);
const $$=(s,scope=document)=>Array.from(scope.querySelectorAll(s));

function injectHeroLayoutFixes(){
  const style=document.createElement('style');
  style.setAttribute('data-hero-layout-fixes','true');
  style.textContent=`
    .rainbow-img{top:18%!important;width:min(640px,50vw)!important;}
    .hero-sun-mark{width:min(220px,30vw)!important;}
    .hero-rise-wordmark{width:min(560px,50vw)!important;}
    .hero.hero-complete{height:auto!important;min-height:0!important;}
    .hero.hero-complete .hero-pin{position:relative!important;top:auto!important;height:auto!important;min-height:calc(100svh - 0px)!important;overflow:hidden!important;}
    .hero.hero-complete .hero-content{height:auto!important;min-height:calc(100svh - 120px)!important;align-items:center!important;padding-top:clamp(5rem,9vw,8rem)!important;padding-bottom:clamp(4rem,7vw,6rem)!important;}
    .hero.hero-complete .hero-copy{opacity:1!important;transform:none!important;}
    .hero.hero-complete .hero-photo-card{opacity:1!important;top:50%!important;bottom:auto!important;transform:translateY(-50%) scale(1)!important;}
    .hero.hero-complete .hero-logo-stage,.hero.hero-complete .storm-clouds,.hero.hero-complete .clear-weather,.hero.hero-complete .rain-layer,.hero.hero-complete .storm-bg{opacity:0!important;pointer-events:none!important;}
    @media(max-width:720px){
      .hero:not(.hero-complete) .rainbow-img{top:22%!important;width:82vw!important;}
      .hero:not(.hero-complete) .hero-sun-mark{width:min(170px,40vw)!important;}
      .hero:not(.hero-complete) .hero-rise-wordmark{width:min(360px,74vw)!important;}
      .hero.hero-complete .hero-pin{min-height:auto!important;overflow:visible!important;display:flex!important;flex-direction:column!important;justify-content:flex-start!important;padding:1.35rem 0 2.25rem!important;background:linear-gradient(180deg,#dfeaf0 0%,#fffdf7 44%,#fff4e3 100%)!important;}
      .hero.hero-complete .hero-content{order:1!important;width:100%!important;min-height:0!important;height:auto!important;display:block!important;padding:1rem 1rem .85rem!important;}
      .hero.hero-complete .hero-copy{width:100%!important;max-width:100%!important;background:rgba(255,253,247,.86)!important;border:1px solid rgba(38,70,83,.08)!important;border-radius:28px!important;padding:1rem!important;backdrop-filter:blur(8px)!important;box-shadow:0 14px 40px rgba(38,70,83,.1)!important;}
      .hero.hero-complete h1{font-size:clamp(2.65rem,12.5vw,3.85rem)!important;line-height:.94!important;margin-bottom:.7rem!important;}
      .hero.hero-complete .eyebrow{font-size:.72rem!important;letter-spacing:.1em!important;line-height:1.45!important;margin-bottom:.5rem!important;}
      .hero.hero-complete .hero-actions{display:grid!important;grid-template-columns:1fr!important;gap:.7rem!important;margin-top:.8rem!important;}
      .hero.hero-complete .hero-actions .btn{width:100%!important;min-height:54px!important;}
      .hero.hero-complete .hero-photo-card{order:2!important;position:relative!important;left:auto!important;right:auto!important;top:auto!important;bottom:auto!important;width:calc(100% - 2rem)!important;margin:.35rem auto 0!important;transform:none!important;border-radius:30px!important;}
      .hero.hero-complete .hero-photo-card img{height:auto!important;aspect-ratio:4/5!important;object-fit:cover!important;object-position:center!important;}
      .hero.hero-complete .hero-photo-card figcaption{position:relative!important;left:auto!important;right:auto!important;bottom:auto!important;margin:0!important;border-radius:0!important;background:rgba(255,255,255,.95)!important;}
      .hero.hero-complete .sunbeam{display:none!important;}
    }
  `;
  document.head.appendChild(style);
}
injectHeroLayoutFixes();

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
function completeHero(hero,pin,trigger){
  if(heroDone)return;
  heroDone=true;
  pin.classList.add('hero-sequence-complete');
  hero.classList.add('hero-complete');
  trigger?.kill(false);
  if(window.ScrollTrigger){setTimeout(()=>ScrollTrigger.refresh(),80);}
}

function initHeroAnimation(){
  const hero=$('.hero');
  const pin=$('.hero-pin');
  if(!hero||!pin)return;
  if(!window.gsap||!window.ScrollTrigger||window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.body.classList.add('hero-ready');
    pin.classList.add('hero-sequence-complete');
    hero.classList.add('hero-complete');
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
  const trigger=ScrollTrigger.create({trigger:'.hero',start:'top top',end:'bottom bottom',animation:tl,scrub:1.25,onLeave:self=>{tl.progress(1);requestAnimationFrame(()=>completeHero(hero,pin,self));}});
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