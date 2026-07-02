const $=(s,scope=document)=>scope.querySelector(s);
const $$=(s,scope=document)=>Array.from(scope.querySelectorAll(s));
const isMobile=()=>window.innerWidth<=720;
const headerEls=()=>['.proposal-ribbon','.site-header','.utility-bar','.main-nav>*'];
const headerHeight=()=>$('.site-header')?.offsetHeight||0;
const syncHeaderOffset=()=>document.documentElement.style.setProperty('--header-h',`${headerHeight()}px`);

function applyContentEnhancements(){
  const labels={'#services':'Services','#support':'Support','#scope':'Scope','#safety':'Safety','#routing':'Routing','#seo':'Search','#contact':'Contact'};
  $$('.nav-menu a').forEach(a=>{const h=a.getAttribute('href');if(labels[h])a.textContent=labels[h];});
  const start=$('.nav-actions a[href="/start-here"]');if(start)start.textContent='Start Here';
  const request=$('.nav-actions a[href="/request-evaluation"]');if(request)request.textContent='Request Eval';
  $$('.audience-card').forEach(card=>{if(card.textContent.includes('Teens')){const img=$('img',card);if(img){img.src='assets/teen-therapy.jpg';img.alt='Teen therapy support session';img.loading='lazy';img.decoding='async';}}});
  const packet=$('.packet-card img');if(packet){packet.src='assets/welcome-packet-fallback.svg';packet.alt='Rise welcome packet and branded materials';packet.loading='lazy';packet.decoding='async';packet.onerror=null;}
}

function applyPricingSection(){
  const section=$('#investment');
  if(!section)return;
  section.className='section-pad pricing-section proposal-expansion alt';
  section.innerHTML=`
    <div class="container">
      <div class="section-heading reveal visible">
        <p class="eyebrow">Investment options</p>
        <h2>Choose the right build path for Rise.</h2>
        <p>Each tier is structured around scope, routing complexity, content ownership, SEO/AEO depth, and how much of the site should become an active operational tool instead of a static brochure.</p>
      </div>
      <div class="pricing-grid reveal visible">
        <article class="pricing-card">
          <span class="pricing-kicker">Tier 1</span>
          <h3>The Essentials</h3>
          <div class="price">$6,500</div>
          <p class="scope">5–7 core pages · Essential patient routing</p>
          <p>This tier establishes immediate credibility and solves front-desk routing issues without the overhead of a massive initial build. It creates a streamlined, highly polished custom site built around the core hubs: Home, Services, About, Contact, and a guided Start Here flow.</p>
          <ul>
            <li>Custom branded design foundation</li>
            <li>Essential SimplePractice handoff and routing</li>
            <li>Core on-page SEO and metadata</li>
            <li>WCAG 2.2 AA accessibility target</li>
            <li>Fast Vercel deployment and launch support</li>
          </ul>
        </article>
        <article class="pricing-card recommended">
          <div class="recommend-badge">Recommended</div>
          <span class="pricing-kicker">Tier 2</span>
          <h3>The Complete Practice Builder</h3>
          <div class="price">$11,500</div>
          <p class="scope">15–20 pages · Dedicated service lanes + basic CMS</p>
          <p>This is the recommended tier based on the demo proposal. It builds the architecture needed to capture local search traffic, educate families, and give every major service its own focused landing page.</p>
          <ul>
            <li>Everything in Essentials</li>
            <li>Dedicated pages for OT, Speech, PT, Behavioral Health, Rise Sports, Rise-Ed, and Renovations</li>
            <li>Foundational headless CMS</li>
            <li>Editable staff profiles, FAQs, insurance notes, and key calls-to-action</li>
            <li>Expanded SEO/AEO and service-specific schema strategy</li>
          </ul>
        </article>
        <article class="pricing-card">
          <span class="pricing-kicker">Tier 3</span>
          <h3>The Community Growth Engine</h3>
          <div class="price">$17,000+</div>
          <p class="scope">20+ pages · Advanced CMS, events, resources + hiring portals</p>
          <p>This premium tier turns the site from a clinical brochure into an active community, recruiting, and growth platform. It supports programs, resources, events, careers, and content publishing at a much deeper level.</p>
          <ul>
            <li>Everything in Practice Builder</li>
            <li>Dynamic Events, Resources, and Careers hubs</li>
            <li>Searchable parent workshops, groups, and downloadable resources</li>
            <li>Hiring/culture section with applicant routing</li>
            <li>Advanced CMS structure for long-term content growth</li>
          </ul>
        </article>
      </div>
      <div class="pricing-table-wrap reveal visible">
        <h3>Pricing tier comparison</h3>
        <table class="pricing-table">
          <thead><tr><th>Feature</th><th>Essentials</th><th>Practice Builder</th><th>Growth Engine</th></tr></thead>
          <tbody>
            <tr><td>Core focus</td><td>Foundation</td><td>Authority</td><td>Expansion</td></tr>
            <tr><td>Estimated page count</td><td>5–7 pages</td><td>15–20 pages</td><td>20+ pages</td></tr>
            <tr><td>Core hubs</td><td>✓</td><td>✓</td><td>✓</td></tr>
            <tr><td>Dedicated service lanes</td><td>—</td><td>✓</td><td>✓</td></tr>
            <tr><td>SimplePractice routing</td><td>✓</td><td>✓</td><td>✓</td></tr>
            <tr><td>Headless CMS</td><td>—</td><td>Basic CMS</td><td>Advanced CMS</td></tr>
            <tr><td>Events / resources / careers hubs</td><td>—</td><td>Optional add-on</td><td>✓</td></tr>
            <tr><td>SEO / AEO depth</td><td>Essential</td><td>Advanced</td><td>Advanced + content engine</td></tr>
            <tr><td>Lead magnets / downloads</td><td>—</td><td>Light setup</td><td>✓</td></tr>
            <tr><td>Hosting support</td><td>✓</td><td>✓</td><td>✓</td></tr>
            <tr><td>Best fit</td><td>Launch a polished foundation fast</td><td>Build the full recommended practice site</td><td>Scale community, recruiting, and content growth</td></tr>
          </tbody>
        </table>
      </div>
    </div>`;
}

function arrangeHeroActions(){
  const hero=$('.hero'),pin=$('.hero-pin'),copy=$('.hero-copy'),photo=$('.hero-photo-card'),actions=$('.hero-actions');
  if(!hero||!pin||!copy||!photo||!actions)return;
  if(hero.classList.contains('hero-complete')&&isMobile()){
    if(actions.parentElement!==pin){actions.classList.add('hero-actions-detached');photo.insertAdjacentElement('afterend',actions);}
  }else if(actions.parentElement!==copy){actions.classList.remove('hero-actions-detached');copy.appendChild(actions);}
}

function injectOverrides(){
  const style=document.createElement('style');
  style.setAttribute('data-rise-runtime-overrides','true');
  style.textContent=`
    html,body{max-width:100%!important;overflow-x:hidden!important}body{position:relative!important}.proposal-ribbon,.site-header,main,.hero,.hero-pin,.footer{max-width:100vw!important;overflow-x:clip!important}.proposal-ribbon,.site-header,.utility-bar,.main-nav>*{will-change:opacity,transform}.hero-nav-cleared .hero:not(.hero-complete) .hero-pin{top:0!important;height:100svh!important}
    .main-nav{grid-template-columns:clamp(190px,16vw,235px) minmax(510px,1fr) auto!important;gap:clamp(.8rem,1.1vw,1.35rem)!important;padding:.9rem 0!important}.brand img{width:clamp(185px,15vw,225px)!important}.nav-menu{gap:clamp(.7rem,1vw,1.15rem)!important;justify-content:center!important}.nav-menu a{white-space:nowrap!important;font-size:clamp(.9rem,.95vw,1.02rem)!important;letter-spacing:.01em!important}.nav-actions{gap:.75rem!important}.nav-actions .btn{width:158px!important;min-width:158px!important;min-height:68px!important;padding:.82rem .95rem!important;text-align:center!important;line-height:1.15!important}
    .intro .three-up{grid-template-columns:1.15fr 1fr!important;max-width:920px!important}.intro .three-up article:nth-child(3){display:none!important}.hero:not(.hero-complete){height:320vh!important}.hero:not(.hero-complete) .hero-pin{position:fixed!important;top:var(--header-h,0px)!important;left:0!important;right:0!important;height:calc(100svh - var(--header-h,0px))!important;z-index:1!important}.hero:not(.hero-complete) .storm-a{top:16%!important;width:min(760px,56vw)!important}.hero:not(.hero-complete) .storm-b{top:21%!important;width:min(700px,52vw)!important}.hero:not(.hero-complete) .white-a{top:21%!important;width:min(560px,43vw)!important}.hero:not(.hero-complete) .white-b{top:25%!important;width:min(500px,39vw)!important}.hero:not(.hero-complete) .rainbow-img{top:27%!important;width:min(520px,41vw)!important}.hero:not(.hero-complete) .hero-logo-stage{transform:translateY(48px)!important}.hero:not(.hero-complete) .hero-sun-mark{width:min(180px,24vw)!important}.hero:not(.hero-complete) .hero-rise-wordmark{width:min(470px,41vw)!important}
    .hero.hero-complete{height:auto!important;min-height:0!important}.hero.hero-complete .hero-pin{position:relative!important;top:auto!important;height:auto!important;min-height:calc(100svh - var(--header-h,0px))!important;overflow:hidden!important}.hero.hero-complete .hero-content{height:auto!important;min-height:calc(100svh - var(--header-h,0px))!important;align-items:center!important;padding-top:clamp(4.75rem,8vw,7rem)!important;padding-bottom:clamp(4rem,7vw,6rem)!important;grid-template-columns:minmax(300px,600px)!important}.hero.hero-complete .hero-copy{opacity:1!important;transform:none!important;max-width:600px!important}.hero.hero-complete h1{font-size:clamp(3.7rem,6.8vw,6.6rem)!important;max-width:600px!important}.hero.hero-complete .hero-photo-card{opacity:1!important;right:5.5%!important;width:min(610px,41vw)!important;top:52%!important;bottom:auto!important;transform:translateY(-50%) scale(1)!important}.hero.hero-complete .hero-logo-stage,.hero.hero-complete .storm-clouds,.hero.hero-complete .clear-weather,.hero.hero-complete .rain-layer,.hero.hero-complete .storm-bg{opacity:0!important;pointer-events:none!important}
    .trust-stage{overflow:visible!important;padding:4.8rem 1.45rem 1.55rem!important}.trust-carousel{overflow:hidden!important;touch-action:pan-y!important;cursor:grab!important;-webkit-mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent);mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)}.trust-carousel.dragging{cursor:grabbing!important}.trust-track{display:flex!important;gap:1rem!important;will-change:transform!important;transform:translate3d(0,0,0);backface-visibility:hidden;user-select:none!important}.review-card{flex:0 0 clamp(330px,30vw,430px)!important;min-height:265px!important}.trust-pop{z-index:6!important;pointer-events:none!important;filter:drop-shadow(0 16px 24px rgba(38,70,83,.15))!important;animation:floaty 7s ease-in-out infinite!important}.trust-sun-rays{right:4%!important;top:-44px!important;width:210px!important;opacity:.32!important}.trust-unicorn-img{left:3%!important;bottom:-18px!important;width:118px!important;transform:rotate(-6deg)!important}.trust-ball-img{right:8%!important;bottom:-10px!important;width:94px!important;animation-delay:-2s!important}.trust-blocks-img{left:30%!important;top:34px!important;width:82px!important;animation-delay:-3s!important}.trust-stars-img{right:31%!important;top:62px!important;width:88px!important;opacity:.72!important;animation-delay:-1s!important}.packet-card img{display:block!important;width:100%!important;height:320px!important;object-fit:cover!important;background:#fffdf7!important}
    .pricing-section{background:linear-gradient(180deg,#fffdf7 0%,#fff4e3 52%,#eef8f8 100%)!important}.pricing-grid{display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:1rem!important;align-items:stretch!important}.pricing-card{position:relative!important;background:rgba(255,255,255,.92)!important;border:1px solid rgba(38,70,83,.12)!important;border-radius:34px!important;box-shadow:var(--soft-shadow)!important;padding:1.45rem!important;display:flex!important;flex-direction:column!important;gap:.75rem!important}.pricing-card.recommended{border:2px solid rgba(241,90,36,.55)!important;transform:translateY(-10px)!important;box-shadow:0 24px 70px rgba(241,90,36,.16)!important}.recommend-badge{position:absolute!important;top:-16px!important;right:22px!important;background:var(--orange)!important;color:#fff!important;border-radius:999px!important;padding:.45rem .8rem!important;font-weight:900!important;font-size:.78rem!important;letter-spacing:.08em!important;text-transform:uppercase!important}.pricing-kicker{color:var(--orange)!important;font-weight:900!important;letter-spacing:.11em!important;text-transform:uppercase!important;font-size:.78rem!important}.pricing-card h3{font-family:"League Spartan"!important;color:var(--navy)!important;font-size:clamp(2rem,2.4vw,2.65rem)!important;line-height:.95!important;margin:0!important}.pricing-card .price{font-family:"League Spartan"!important;font-size:clamp(2.6rem,4vw,4rem)!important;font-weight:900!important;color:var(--navy)!important;line-height:.9!important}.pricing-card .scope{font-weight:900!important;color:var(--orange)!important;margin:0!important}.pricing-card p{color:var(--muted)!important;margin:0!important}.pricing-card ul{margin:.35rem 0 0!important;padding-left:1.1rem!important;color:var(--text)!important}.pricing-card li{margin:.42rem 0!important}.pricing-table-wrap{margin-top:1.25rem!important;background:#fff!important;border:1px solid rgba(38,70,83,.12)!important;border-radius:34px!important;box-shadow:var(--soft-shadow)!important;padding:1.35rem!important;overflow-x:auto!important}.pricing-table-wrap h3{font-family:"League Spartan"!important;font-size:2.1rem!important;color:var(--navy)!important;margin:0 0 .8rem!important}.pricing-table{width:100%!important;border-collapse:separate!important;border-spacing:0!important;min-width:860px!important}.pricing-table th{background:var(--navy)!important;color:#fff!important;text-align:left!important;padding:.9rem!important;font-weight:900!important}.pricing-table td{padding:.85rem .9rem!important;border-bottom:1px solid rgba(38,70,83,.1)!important;color:var(--text)!important}.pricing-table tr:last-child td{border-bottom:0!important}.pricing-table td:first-child{font-weight:900!important;color:var(--navy)!important}.pricing-table th:nth-child(3),.pricing-table td:nth-child(3){background:rgba(241,90,36,.07)!important}
    @media(max-width:1200px){.main-nav{grid-template-columns:190px 1fr auto!important}.nav-actions .btn{width:146px!important;min-width:146px!important}.nav-menu{gap:.62rem!important}.nav-menu a{font-size:.9rem!important}}
    @media(max-width:1100px){.main-nav{grid-template-columns:210px 1fr!important}.nav-actions .btn{width:auto!important;min-width:0!important}.intro .three-up{grid-template-columns:1fr!important;max-width:100%!important}.hero.hero-complete .hero-photo-card{width:min(560px,47vw)!important}.hero.hero-complete h1{font-size:clamp(3.35rem,6.4vw,5.7rem)!important}.pricing-grid{grid-template-columns:1fr!important}.pricing-card.recommended{transform:none!important}}
    @media(max-width:720px){.proposal-ribbon,.site-header,main,.hero,.hero-pin,.footer,.container{max-width:100vw!important;overflow-x:clip!important}.hero:not(.hero-complete){height:320vh!important}.hero:not(.hero-complete) .hero-pin{position:fixed!important;top:var(--header-h,0px)!important;left:0!important;right:0!important;height:calc(100svh - var(--header-h,0px))!important;z-index:1!important}.hero-nav-cleared .hero:not(.hero-complete) .hero-pin{top:0!important;height:100svh!important}.hero:not(.hero-complete) .storm-a{top:18%!important;left:-18%!important;width:92vw!important}.hero:not(.hero-complete) .storm-b{top:28%!important;right:-22%!important;width:82vw!important}.hero:not(.hero-complete) .white-a{top:21%!important;left:-14%!important;width:86vw!important}.hero:not(.hero-complete) .white-b{top:30%!important;right:-18%!important;width:76vw!important}.hero:not(.hero-complete) .rainbow-img{top:33%!important;width:68vw!important}.hero:not(.hero-complete) .hero-logo-stage{transform:translateY(42px)!important}.hero:not(.hero-complete) .hero-sun-mark{width:min(130px,34vw)!important}.hero:not(.hero-complete) .hero-rise-wordmark{width:min(285px,68vw)!important}.hero:not(.hero-complete) .hero-brand-subline{font-size:.68rem!important;letter-spacing:.13em!important}.hero.hero-complete .hero-pin{min-height:auto!important;overflow:clip!important;display:flex!important;flex-direction:column!important;justify-content:flex-start!important;padding:1.2rem 0 2.25rem!important;background:linear-gradient(180deg,#dfeaf0 0%,#fffdf7 44%,#fff4e3 100%)!important}.hero.hero-complete .hero-content{order:1!important;width:100%!important;max-width:100vw!important;min-height:0!important;height:auto!important;display:block!important;padding:1rem 1rem .7rem!important}.hero.hero-complete .hero-copy{width:100%!important;max-width:100%!important;background:rgba(255,253,247,.88)!important;border:1px solid rgba(38,70,83,.08)!important;border-radius:28px!important;padding:1rem!important;backdrop-filter:blur(8px)!important;box-shadow:0 14px 40px rgba(38,70,83,.1)!important}.hero.hero-complete .hero-copy *{max-width:100%!important}.hero.hero-complete h1{font-size:clamp(2.55rem,11.5vw,3.55rem)!important;line-height:.94!important;margin-bottom:.35rem!important;max-width:100%!important}.hero.hero-complete .eyebrow{font-size:.72rem!important;letter-spacing:.1em!important;line-height:1.45!important;margin-bottom:.5rem!important}.hero.hero-complete .hero-photo-card{order:2!important;position:relative!important;left:auto!important;right:auto!important;top:auto!important;bottom:auto!important;width:calc(100% - .75rem)!important;margin:.35rem .75rem 0 0!important;transform:none!important;border-radius:30px!important;max-width:calc(100vw - .75rem)!important}.hero.hero-complete .hero-photo-card img{height:auto!important;aspect-ratio:16/11!important;object-fit:cover!important;object-position:60% center!important}.hero.hero-complete .hero-photo-card figcaption{position:relative!important;left:auto!important;right:auto!important;bottom:auto!important;margin:0!important;border-radius:0!important;background:rgba(255,255,255,.95)!important}.hero.hero-complete .hero-actions{order:3!important;position:relative!important;left:auto!important;right:auto!important;top:auto!important;bottom:auto!important;transform:none!important;width:calc(100% - 2rem)!important;max-width:calc(100vw - 2rem)!important;display:grid!important;grid-template-columns:1fr!important;gap:.7rem!important;margin:.85rem auto 0!important;padding:0!important}.hero.hero-complete .hero-actions .btn{width:100%!important;min-height:54px!important}.hero.hero-complete .sunbeam{display:none!important}.trust-stage{padding:4.1rem .9rem 1rem!important;overflow:hidden!important}.trust-carousel{-webkit-mask-image:none!important;mask-image:none!important}.review-card{flex-basis:86vw!important}.trust-sun-rays{width:160px!important;top:-28px!important}.trust-unicorn-img{width:88px!important}.trust-ball-img,.trust-blocks-img,.trust-stars-img{width:66px!important}.packet-card img{height:260px!important}.pricing-card{padding:1.1rem!important}.pricing-table-wrap{padding:1rem!important}.pricing-table{min-width:780px!important}}
  `;
  document.head.appendChild(style);
  syncHeaderOffset();
  window.addEventListener('resize',()=>{syncHeaderOffset();arrangeHeroActions();},{passive:true});
}

injectOverrides();
applyContentEnhancements();
applyPricingSection();

const navToggle=$('.nav-toggle'),navMenu=$('#navMenu'),navActions=$('.nav-actions');
navToggle?.addEventListener('click',()=>{const expanded=navToggle.getAttribute('aria-expanded')==='true';navToggle.setAttribute('aria-expanded',String(!expanded));navMenu?.classList.toggle('open');navActions?.classList.toggle('open');setTimeout(syncHeaderOffset,80);});
$$('.nav-menu a').forEach(link=>link.addEventListener('click',()=>{navToggle?.setAttribute('aria-expanded','false');navMenu?.classList.remove('open');navActions?.classList.remove('open');setTimeout(syncHeaderOffset,80);}));

const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));

function createRain(){const layer=$('.rain-layer');if(!layer||layer.children.length)return;for(let i=0;i<82;i++){const drop=document.createElement('span');drop.className='rain-drop';drop.style.left=`${Math.random()*100}%`;drop.style.animationDelay=`${Math.random()*1.2}s`;drop.style.animationDuration=`${.75+Math.random()*.55}s`;drop.style.opacity=`${.18+Math.random()*.42}`;layer.appendChild(drop);}}
createRain();

let heroDone=false;
function completeHero(hero,pin,trigger){
  if(heroDone)return;heroDone=true;syncHeaderOffset();
  const anchorTop=Math.max(0,hero.offsetTop-headerHeight());
  trigger?.kill(false);document.body.classList.remove('hero-nav-cleared');
  if(window.gsap){gsap.set(headerEls(),{autoAlpha:1,yPercent:0});}
  pin.classList.add('hero-sequence-complete');hero.classList.add('hero-complete');arrangeHeroActions();
  requestAnimationFrame(()=>window.scrollTo({top:anchorTop,behavior:'auto'}));
}

function initHeroAnimation(){
  const hero=$('.hero'),pin=$('.hero-pin');if(!hero||!pin)return;syncHeaderOffset();
  if(!window.gsap||!window.ScrollTrigger||window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.body.classList.add('hero-ready');pin.classList.add('hero-sequence-complete');hero.classList.add('hero-complete');arrangeHeroActions();
    if(window.gsap){gsap.set(['.bright-bg','.hero-photo-card','.hero-copy'],{opacity:1,y:0,scale:1});gsap.set(['.hero-logo-stage','.storm-clouds','.clear-weather','.rain-layer'],{opacity:0});gsap.set(headerEls(),{autoAlpha:1,yPercent:0});gsap.set('.sunbeam',{width:'58%'});}return;
  }
  gsap.registerPlugin(ScrollTrigger);
  gsap.set(['.hero-sun-mark','.hero-rise-wordmark','.hero-brand-subline','.hero-photo-card','.hero-copy'],{opacity:0});
  gsap.set('.logo-sun-glow',{opacity:0,scale:.45});gsap.set('.clear-weather',{opacity:0});gsap.set('.rainbow-img',{opacity:0,y:18});gsap.set('.sunbeam',{width:0});gsap.set(headerEls(),{autoAlpha:1,yPercent:0});
  const mobile=isMobile();
  const navStart=mobile?0.02:0.58;
  const barStart=mobile?0.02:0.74;
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
    .call(()=>document.body.classList.add('hero-nav-cleared'),null,barStart)
    .to(['.utility-bar','.main-nav>*'],{autoAlpha:0,yPercent:-64,duration:mobile?0.32:0.36},navStart)
    .to(['.proposal-ribbon','.site-header'],{autoAlpha:0,yPercent:-100,duration:mobile?0.38:0.42},barStart)
    .to(['.hero-sun-mark','.hero-rise-wordmark','.hero-brand-subline','.logo-sun-glow'],{opacity:0,duration:.95},4.0)
    .to(['.storm-bg','.storm-clouds','.clear-weather','.rain-layer'],{opacity:0,duration:.95},4.0);
  ScrollTrigger.create({trigger:'.hero',start:()=>`top top+=${headerHeight()}`,end:'bottom bottom',animation:tl,scrub:1.25,onLeave:self=>{tl.progress(1);requestAnimationFrame(()=>completeHero(hero,pin,self));}});
}
window.addEventListener('load',initHeroAnimation);

function initTrustCarousel(){
  const carousel=$('#trustCarousel'),track=$('#trustTrack');if(!carousel||!track)return;
  if(!track.dataset.smoothReady){const original=Array.from(track.children);original.forEach(card=>track.appendChild(card.cloneNode(true)));track.dataset.smoothReady='true';}
  let x=0,velocity=0,dragging=false,lastX=0,lastT=0,lastFrame=performance.now();const autoSpeed=.035;
  const width=()=>track.scrollWidth/2;
  const normalize=()=>{const w=width();if(!w)return;while(x<=-w)x+=w;while(x>0)x-=w;};
  const paint=()=>{normalize();track.style.transform=`translate3d(${x}px,0,0)`;};
  const tick=now=>{const dt=Math.min(34,now-lastFrame||16);lastFrame=now;if(!dragging){x-=autoSpeed*dt;x+=velocity*dt;velocity*=Math.pow(.9,dt/16.7);if(Math.abs(velocity)<.003)velocity=0;paint();}requestAnimationFrame(tick);};
  requestAnimationFrame(tick);
  carousel.addEventListener('pointerdown',e=>{dragging=true;carousel.classList.add('dragging');lastX=e.clientX;lastT=performance.now();velocity=0;carousel.setPointerCapture?.(e.pointerId);});
  carousel.addEventListener('pointermove',e=>{if(!dragging)return;e.preventDefault();const now=performance.now(),dx=e.clientX-lastX,dt=Math.max(8,now-lastT);x+=dx;velocity=dx/dt;lastX=e.clientX;lastT=now;paint();});
  const end=e=>{if(!dragging)return;dragging=false;carousel.classList.remove('dragging');carousel.releasePointerCapture?.(e.pointerId);};
  carousel.addEventListener('pointerup',end);carousel.addEventListener('pointercancel',end);carousel.addEventListener('pointerleave',end);
}
initTrustCarousel();

function initPrototypeBubbles(){
  const pop=$('#demoPop');if(!pop)return;const titleEl=$('strong',pop),textEl=$('p',pop);let timer;const hide=()=>pop.classList.remove('active');
  $$('.bubble-link').forEach(link=>{link.addEventListener('click',event=>{event.preventDefault();clearTimeout(timer);const rect=link.getBoundingClientRect();titleEl.textContent=link.dataset.bubbleTitle||'Prototype link';textEl.textContent=link.dataset.bubble||'In the finished website, this would route visitors to the appropriate page or workflow.';const x=Math.min(Math.max(rect.left+rect.width/2,210),window.innerWidth-210),y=Math.max(rect.top+window.scrollY-12,window.scrollY+90);pop.style.left=`${x}px`;pop.style.top=`${y}px`;pop.classList.add('active');const href=link.getAttribute('href')||'';if(href.startsWith('#')&&href.length>1){const target=$(href);if(target)setTimeout(()=>target.scrollIntoView({behavior:'smooth',block:'start'}),420);}timer=setTimeout(hide,5200);});});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')hide();});document.addEventListener('click',event=>{if(!event.target.closest('.bubble-link')&&!event.target.closest('#demoPop'))hide();});
}
initPrototypeBubbles();