const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const navToggle = $('.nav-toggle');
const navMenu = $('#navMenu');
navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('open');
});

$$('.nav-menu a').forEach(link => link.addEventListener('click', () => {
  navMenu?.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
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

$$('[data-tabs]').forEach(tabs => {
  const buttons = $$('[role="tab"]', tabs);
  const panels = $$('.tab-panel', tabs);
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(b => b.setAttribute('aria-selected', 'false'));
      panels.forEach(panel => panel.classList.remove('active'));
      button.setAttribute('aria-selected', 'true');
      $('#' + button.dataset.tab, tabs)?.classList.add('active');
    });
  });
});

let currentStep = 1;
const showStep = step => {
  currentStep = Math.max(1, Math.min(4, step));
  $$('.wizard-step').forEach(panel => panel.classList.toggle('active', Number(panel.dataset.step) === currentStep));
  $$('[data-step-dot]').forEach((dot, index) => dot.classList.toggle('active', index + 1 <= currentStep));
  $('[data-next-step]').textContent = currentStep === 4 ? 'Submit demo request' : 'Next';
};
$('[data-next-step]')?.addEventListener('click', () => {
  if (currentStep === 4) {
    $('[data-next-step]').textContent = 'Request captured ✓';
    setTimeout(() => $('[data-next-step]').textContent = 'Submit demo request', 1500);
    return;
  }
  showStep(currentStep + 1);
});
$('[data-prev-step]')?.addEventListener('click', () => showStep(currentStep - 1));
$$('.option-grid button').forEach(button => button.addEventListener('click', () => button.classList.toggle('selected')));

$$('[data-accordion] button').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
  });
});

const slider = $('[data-slider] input');
const afterPanel = $('.after-panel');
slider?.addEventListener('input', event => {
  const value = event.target.value;
  afterPanel.style.clipPath = `polygon(${value}% 0,100% 0,100% 100%,${value}% 100%)`;
});

const floatingToggle = $('[data-proposal-toggle]');
const floatingPanel = $('.floating-panel');
floatingToggle?.addEventListener('click', () => {
  const expanded = floatingToggle.getAttribute('aria-expanded') === 'true';
  floatingToggle.setAttribute('aria-expanded', String(!expanded));
  floatingPanel.hidden = expanded;
});

const pagePlans = {
  ot: {
    title: 'Occupational Therapy page plan',
    bullets: ['Conditions / concerns families recognize', 'Daily-life outcomes instead of clinical jargon', 'What evaluation includes', 'Session rhythm + home carryover', 'Insurance/referral CTA', 'FAQ + testimonial block']
  },
  slp: {
    title: 'Speech Therapy page plan',
    bullets: ['Speech vs language clarity', 'Feeding + communication support', 'Age-specific concerns', 'Family carryover strategies', 'Referral + evaluation CTA', 'ASHA-aligned educational links']
  },
  pt: {
    title: 'Physical Therapy launch-ready page',
    bullets: ['Summer 2026 service announcement', 'Strength/mobility/coordination outcomes', 'Sports + movement bridge', 'Provider bios once available', 'Waitlist CTA', 'Schema-ready service content']
  },
  bh: {
    title: 'Behavioral Health launch-ready page',
    bullets: ['Regulation-first copy', 'Neuro-affirming mental wellness positioning', 'Caregiver and client fit', 'Service availability note', 'Soft intake CTA', 'Crisis disclaimer for safety']
  },
  ed: {
    title: 'Rise-Ed + Consulting page plan',
    bullets: ['IEP / 504 support', 'School observations', 'Behavior + emotional support', 'Sensory room design, policy, training', 'Professional development workshops', 'Partner inquiry form']
  },
  sportsPlan: {
    title: 'Rise Sports & Groups page plan',
    bullets: ['Program calendar', 'Age/ability grouping', '8-week session details', 'OT-coached differentiation', 'Registration flow', 'Photos, testimonials, and social proof']
  },
  renovationPlan: {
    title: 'Rise Renovations page plan',
    bullets: ['Before/after gallery', 'Room type categories', 'Process: assess, design, build, train', 'School/daycare/home CTAs', 'Downloadable checklist', 'Case-study storytelling']
  },
  clientHub: {
    title: 'New Client Hub page plan',
    bullets: ['Start Here wizard', 'Welcome packet download', 'First appointment guide', 'Insurance and billing clarity', 'Provider referral upload', 'Portal access and FAQ']
  }
};

const modal = $('[data-modal]');
const modalTitle = $('#modalTitle');
const modalBody = $('#modalBody');
$$('[data-open-panel]').forEach(button => {
  button.addEventListener('click', () => {
    const plan = pagePlans[button.dataset.openPanel];
    if (!plan) return;
    modalTitle.textContent = plan.title;
    modalBody.innerHTML = `<p>This is what the final service-detail page should include so visitors understand fit, value, next steps, and local search relevance.</p><ul>${plan.bullets.map(item => `<li>${item}</li>`).join('')}</ul>`;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  });
});
$$('[data-close-panel]').forEach(button => {
  button.addEventListener('click', () => {
    modal.hidden = true;
    document.body.style.overflow = '';
  });
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal && !modal.hidden) {
    modal.hidden = true;
    document.body.style.overflow = '';
  }
});

$('[data-demo-submit]')?.addEventListener('click', event => {
  event.currentTarget.textContent = 'Demo request routed ✓';
  setTimeout(() => event.currentTarget.textContent = 'Send demo request', 1700);
});
