const $=(s,scope=document)=>scope.querySelector(s);
const $$=(s,scope=document)=>Array.from(scope.querySelectorAll(s));

function headerHeight(){return $('.site-header')?.offsetHeight||0;}
function syncHeaderOffset(){document.documentElement.style.setProperty('--header-h',`${headerHeight()}px`);}

function arrangeHeroActions(){
  const hero=$('.hero');
  const pin=$('.hero-pin');
  const copy=$('.hero-copy');
  const photo=$('.hero-photo-card');
  const actions=$('.hero-actions');
  if(!hero||!pin||!copy||!photo||!actions)return;
  const mobile=window.innerWidth<=720;
  if(hero.classList.contains('hero-complete')&&mobile){
    if(actions.parentElement!==pin){
      actions.classList.add('hero-actions-detached');
      photo.insertAdjacentElement('afterend',actions);
    }
  }else if(actions.parentElement!==copy){
    actions.classList.remove('hero-actions-detached');
    copy.appendChild(actions);
  }
}

function injectHeroLayoutFixes(){
  const style=document.createElement('style');
  style.setAttribute('data-hero-layout-fixes','true');
  style.textContent=`
    html,body{max-width:100%!important;overflow-x:hidden!important;}
    body{position:relative!important;}
    .proposal-ribbon,.site-header,main,.hero,.hero-pin,.footer{max-width:100vw!important;overflow-x:clip!important;}
    .intro .three-up{grid-template-columns:1.15fr 1fr!important;max-width:920px!important;}
    .intro .three-up article:nth-child(3){display:none!important;}
    .hero:not(.hero-complete) .hero-pin{top:var(--header-h,0px)!important;height:calc(100svh - var(--header-h,0px))!important;}
    .hero:not(.hero-complete) .storm-a{top:16%!important;width:min(760px,56vw)!important;}
    .hero:not(.hero-complete) .storm-b{top:21%!important;width:min(700px,52vw)!important;}
    .hero:not(.hero-complete) .white-a{top:21%!important;width:min(560px,43vw)!important;}
    .hero:not(.hero-complete) .white-b{top:25%!important;width:min(500px,39vw)!important;}
    .hero:not(.hero-complete) .rainbow-img{top:27%!important;width:min(520px,41vw)!important;}
    .hero:not(.hero-complete) .hero-logo-stage{transform:translateY(48px)!important;}
    .hero:not(.hero-complete) .hero-sun-mark{width:min(180px,24vw)!important;}
    .hero:not(.hero-complete) .hero-rise-wordmark{width:min(470px,41vw)!important;}
    .hero.hero-complete{height:auto!important;min-height:0!important;}
    .hero.hero-complete .hero-pin{position:relative!important;top:auto!important;height:auto!important;min-height:calc(100svh - var(--header-h,0px))!important;overflow:hidden!important;}
    .hero.hero-complete .hero-content{height:auto!important;min-height:calc(100svh - var(--header-h,0px))!important;align-items:center!important;padding-top:clamp(4.75rem,8vw,7rem)!important;padding-bottom:clamp(4rem,7vw,6rem)!important;grid-template-columns:minmax(300px,600px)!important;}
    .hero.hero-complete .hero-copy{opacity:1!important;transform:none!important;max-width:600px!important;}
    .hero.hero-complete h1{font-size:clamp(3.7rem,6.8vw,6.6rem)!important;max-width:600px!important;}
    .hero.hero-complete .hero-photo-card{opacity:1!important;right:5.5%!important;width:min(610px,41vw)!important;top:52%!important;bottom:auto!important;transform:translateY(-50%) scale(1)!important;}
    .hero.hero-complete .hero-logo-stage,.hero.hero-complete .storm-clouds,.hero.hero-complete .clear-weather,.hero.hero-complete .rain-layer,.hero.hero-complete .storm-bg{opacity:0!important;pointer-events:none!important;}
    @media(max-width:1100px){.intro .three-up{grid-template-columns:1fr!important;max-width:100%!important;}.hero.hero-complete .hero-photo-card{width:min(560px,47vw)!important;}.hero.hero-complete h1{font-size:clamp(3.35rem,6.4vw,5.7rem)!important;}}
    @media(max-width:720px){
      .proposal-ribbon,.site-header,main,.hero,.hero-pin,.footer,.container{max-width:100vw!important;overflow-x:clip!important;}
      .hero:not(.hero-complete) .hero-pin{top:var(--header-h,0px)!important;height:calc(100svh - var(--header-h,0px))!important;}
      .hero:not(.hero-complete) .storm-a{top:18%!important;left:-18%!important;width:92vw!important;}
      .hero:not(.hero-complete) .storm-b{top:28%!important;right:-22%!important;width:82vw!important;}
      .hero:not(.hero-complete) .white-a{top:21%!important;left:-14%!important;width:86vw!important;}
      .hero:not(.hero-complete) .white-b{top:30%!important;right:-18%!important;width:76vw!important;}
      .hero:not(.hero-complete) .rainbow-img{top:33%!important;width:68vw!important;}
      .hero:not(.hero-complete) .hero-logo-stage{transform:translateY(42px)!important;}
      .hero:not(.hero-complete) .hero-sun-mark{width:min(130px,34vw)!important;}
      .hero:not(.hero-complete) .hero-rise-wordmark{width:min(285px,68vw)!important;}
      .hero:not(.hero-complete) .hero-brand-subline{font-size:.68rem!important;letter-spacing:.13em!important;}
      .hero.hero-complete .hero-pin{min-height:auto!important;overflow:clip!important;display:flex!important;flex-direction:column!important;justify-content:flex-start!important;padding:1.2rem 0 2.25rem!important;background:linear-gradient(180deg,#dfeaf0 0%,#fffdf7 44%,#fff4e3 100%)!important;}
      .hero.hero-complete .hero-content{order:1!important;width:100%!important;max-width:100vw!important;min-height:0!important;height:auto!important;display:block!important;padding:1rem 1rem .7rem!important;}
      .hero.hero-complete .hero-copy{width:100%!important;max-width:100%!important;background:rgba(255,253,247,.88)!important;border:1px solid rgba(38,70,83,.08)!important;border-radius:28px!important;padding:1rem!important;backdrop-filter:blur(8px)!important;box-shadow:0 14px 40px rgba(38,70,83,.1)!important;}
      .hero.hero-complete .hero-copy *{max-width:100%!important;}
      .hero.hero-complete h1{font-size:clamp(2.55rem,11.5vw,3.55rem)!important;line-height:.94!important;margin-bottom:.35rem!important;max-width:100%!important;}
      .hero.hero-complete .eyebrow{font-size:.72rem!important;letter-spacing:.1em!important;line-height:1.45!important;margin-bottom:.5rem!important;}
      .hero.hero-complete .hero-photo-card{order:2!important;position:relative!important;left:auto!important;right:auto!important;top:auto!important;bottom:auto!important;width:calc(100% - .75rem)!important;margin:.35rem .75rem 0 0!important;transform:none!important;border-radius:30px!important;max-width:calc(100vw - .75rem)!important;}
      .hero.hero-complete .hero-photo-card img{height:auto!important;aspect-ratio:16/11!important;object-fit:cover!important;object-position:60% center!important;}
      .hero.hero-complete .hero-photo-card figcaption{position:relative!important;left:auto!important;right:auto!important;bottom:auto!important;margin:0!important;border-radius:0!important;background:rgba(255,255,255,.95)!important;}
      .hero.hero-complete .hero-actions{order:3!important;position:relative!important;left:auto!important;right:auto!important;top:auto!important;bottom:auto!important;transform:none!important;width:calc(100% - 2rem)!important;max-width:calc(100vw - 2rem)!important;display:grid!important;grid-template-columns:1fr!important;gap:.7rem!important;margin:.85rem auto 0!important;padding:0!important;}
      .hero.hero-complete .hero-actions .btn{width:100%!important;min-height:54px!important;}
      .hero.hero-complete .sunbeam{display:none!important;}
    }
  `;
  document.head.appendChild(style);
  syncHeaderOffset();
  window.addEventListener('resize',()=>{syncHeaderOffset();arrangeHeroActions();},{passive:true});
}
injectHeroLayoutFixes();

const navToggle=$('.nav-toggle');
const navMenu=$('#navMenu');
const navActions=$('.nav-actions');
navToggle?.addEventListener('click',()=>{const expanded=navToggle.getAttribute('aria-expanded')==='true';navToggle.setAttribute('aria-expanded',String(!expanded));navMenu?.classList.toggle('open');navActions?.classList.toggle('open');setTimeout(syncHeaderOffset,80);});
$$('.nav-menu a').forEach(link=>link.addEventListener('click',()=>{navToggle?.setAttribute('aria-expanded','false');navMenu?.classList.remove('open');navActions?.classList.remove('open');setTimeout(syncHeaderOffset,80);}));

const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));

function createRain(){const layer=$('.rain-layer');if(!layer||layer.children.length)return;for(let i=0;i<82;i++){const drop=document.createElement('span');drop.className='rain-drop';drop.style.left=`${Math.random()*100}%`;drop.style.animationDelay=`${Math.random()*1.2}s`;drop.style.animationDuration=`${.75+Math.random()*.55}s`;drop.style.opacity=`${.18+Math.random()*.42}`;layer.appendChild(drop);}}
createRain();

let heroDone=false;
function completeHero(hero,pin,trigger){
  if(heroDone)return;
  heroDone=true;
  syncHeaderOffset();
  const anchorTop=Math.max(0,hero.offsetTop-headerHeight());
  trigger?.kill(false);
  pin.classList.add('hero-sequence-complete');
  hero.classList.add('hero-complete');
  arrangeHeroActions();
  requestAnimationFrame(()=>{
    window.scrollTo({top:anchorTop,behavior:'auto'});
  });
}

function initHeroAnimation(){
  const hero=$('.hero');
  const pin=$('.hero-pin');
  if(!hero||!pin)return;
  syncHeaderOffset();
  if(!window.gsap||!window.ScrollTrigger||window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.body.classList.add('hero-ready');
    pin.classList.add('hero-sequence-complete');
    hero.classList.add('hero-complete');
    arrangeHeroActions();
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
  tl.to('.storm-a',{xPercent:-100,yPercent:-8,opacity:.08,duration:1.4},0)
    .to('.storm-b',{xPercent:96,yPercent:-8,opacity:.08,duration:1.4},0)
    .to('.rain-layer',{opacity:.16,duration:1.2},.05)
    .to('.bright-bg',{opacity:1,duration:1.3},.35)
    .to('.clear-weather',{opacity:1,duration:1.25},.72)
    .fromTo('.white-a',{xPercent:-20,opacity:0},{xPercent:0,opacity:.95,duration:1.05},.9)
    .fromTo('.white-b',{xPercent:20,opacity:0},{xPercent:0,opacity:.95,duration:1.05},1.0)
    .to('.rainbow-img',{opacity:.95,y:0,duration:1.2},1.35)
    .to('.hero-sun-mark',{opacity:1,y:0,scale:1,duration:1.05},1.9)
    .to('.logo-sun-glow',{opacity:1,scale:1.45,duration:1.1},2.05)
    .to('.hero-rise-wordmark',{opacity:1,y:0,duration:.95},2.55)
    .to('.hero-brand-subline',{opacity:1,y:0,duration:.72},2.95)
    .to(['.hero-sun-mark','.hero-rise-wordmark','.hero-brand-subline','.logo-sun-glow'],{opacity:0,duration:.95},4.0)
    .to(['.storm-bg','.storm-clouds','.clear-weather','.rain-layer'],{opacity:0,duration:.95},4.0);
  const trigger=ScrollTrigger.create({trigger:'.hero',start:()=>`top top+=${headerHeight()}`,end:'bottom bottom',animation:tl,scrub:1.25,onLeave:self=>{tl.progress(1);requestAnimationFrame(()=>completeHero(hero,pin,self));}});
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