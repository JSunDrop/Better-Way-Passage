
/* --- Config: set your live URLs here --- */
window.BWP_CONFIG = Object.assign({
  SURVEY_URL: "https://example.typeform.com/to/your-form",   // TODO: replace with Typeform/Qualtrics/Google Forms link
  DONATION_URL_ONE_TIME: "https://donate.stripe.com/test_123",  // TODO: Stripe Checkout link for one-time
  DONATION_URL_RECUR: "https://donate.stripe.com/test_sub_456", // TODO: Stripe Checkout link for recurring (Price ID w/ mode=subscription)
  PAYPAL_DONATE_URL: "https://www.paypal.com/donate?hosted_button_id=YOUR_ID" // Optional: PayPal donate button
}, window.BWP_CONFIG || {});

/* Wire up donate buttons and survey embeds */
document.addEventListener('DOMContentLoaded', function(){
  // Buttons
  document.querySelectorAll('[data-donate="once"]').forEach(btn => btn.addEventListener('click', () => window.open(window.BWP_CONFIG.DONATION_URL_ONE_TIME, '_blank')));
  document.querySelectorAll('[data-donate="recurring"]').forEach(btn => btn.addEventListener('click', () => window.open(window.BWP_CONFIG.DONATION_URL_RECUR, '_blank')));
  document.querySelectorAll('[data-donate="paypal"]').forEach(btn => btn.addEventListener('click', () => window.open(window.BWP_CONFIG.PAYPAL_DONATE_URL, '_blank')));

  // Survey iframe
  const iframe = document.getElementById('bwp-survey-frame');
  if (iframe && window.BWP_CONFIG.SURVEY_URL) {
    iframe.src = window.BWP_CONFIG.SURVEY_URL;
  }
});


// Basic interactivity shared across pages
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

// Mobile nav
const toggle = $('.nav-toggle');
const menu = $('#menu');
if (toggle && menu){
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    menu.style.transform = open ? 'translateY(-110%)' : 'translateY(0)';
  });
}

// Year
const y = $('#year');
if (y) y.textContent = new Date().getFullYear();

// Animate stats numbers
$$('.num').forEach(el => {
  const target = Number(el.dataset.target || '0');
  let current = 0;
  const step = Math.max(1, Math.round(target / 80));
  const tick = () => {
    current += step;
    if (current >= target) { el.textContent = target; return; }
    el.textContent = current;
    requestAnimationFrame(tick);
  };
  tick();
});

// Newsletter placeholder
function subscribeEmail(e){
  e.preventDefault();
  const val = $('#newsletter-email').value;
  alert('Thanks! We\'ll add ' + val + ' once Mailchimp/HubSpot is connected.');
  return false;
}
window.subscribeEmail = subscribeEmail;

// Contact form (mailto fallback)
function submitContact(e){
  e.preventDefault();
  const name = $('#name').value.trim();
  const email = $('#email').value.trim();
  const topic = $('#topic').value;
  const message = $('#message').value.trim();
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`);
  window.location.href = `mailto:hello@bwpinc.org?subject=Website Contact: ${encodeURIComponent(topic)}&body=${body}`;
  return false;
}
window.submitContact = submitContact;

// Survey link placeholder
window.SURVEY_URL = window.SURVEY_URL || 'https://example.typeform.com/to/your-id'; // replace
const surveyLink = $('#survey-link');
if (surveyLink) surveyLink.href = window.SURVEY_URL;

// Donation handler placeholder
window.DONATION_LINK = window.DONATION_LINK || 'https://donate.stripe.com/your_link_here'; // replace
function handleDonate(){
  const chip = $('.chip.active');
  let amount = chip ? chip.dataset.amt : $('#custom-amt').value;
  if (!amount || Number(amount) <= 0) amount = 25;
  const recurring = $('#recurring').checked;
  // You can map recurring to a different link if needed
  const url = window.DONATION_LINK + '?prefilled_amount=' + encodeURIComponent(amount) + (recurring ? '&mode=subscription' : '');
  window.location.href = url;
}
window.handleDonate = handleDonate;

$$('.chip').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    $('#custom-amt').value = '';
  });
});

// Home: load featured resources
if (document.getElementById('featured-resources')){
  const mount = document.getElementById('featured-resources');
  const items = (window.RESOURCES || []).slice(0,3);
  mount.innerHTML = items.map(renderResourceCard).join('');
}

// Resources page logic
if (document.getElementById('resource-list')){
  const listEl = document.getElementById('resource-list');
  function applyFilters(){
    const q = $('#q').value.toLowerCase();
    const cat = $('#category').value;
    const fmt = $('#format').value;
    const acc = $('#access').value;
    const items = (window.RESOURCES || []).filter(r => {
      return (!q || (r.title + ' ' + r.blurb).toLowerCase().includes(q)) &&
             (!cat || r.category === cat) &&
             (!fmt || r.format === fmt) &&
             (!acc || r.access === acc);
    });
    listEl.innerHTML = items.map(renderResourceCard).join('') || '<p>No resources match yet.</p>';
  }
  ['q','category','format','access'].forEach(id => $('#'+id).addEventListener('input', applyFilters));
  applyFilters();
}

function renderResourceCard(r){
  const locked = r.access === 'Premium';
  const lockBadge = locked ? '<span class="lock" aria-hidden="true">🔒</span>' : '';
  const btn = locked
    ? '<button class="btn small outline" onclick="alert(\'This item is premium. Connect the paywall to unlock.\')">Premium</button>'
    : `<a class="btn small" href="${r.url}">Open</a>`;
  return `<article class="card">
    <h3>${lockBadge}${r.title}</h3>
    <p>${r.blurb}</p>
    <p class="fine">${r.category} • ${r.format} • ${r.access}</p>
    ${btn}
  </article>`;
}


/* Tiny scroll-reveal enhancement */
(function(){
  if (!("IntersectionObserver" in window)) return;
  const els = document.querySelectorAll(".reveal, .panel");
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); } });
  }, {threshold: 0.15});
  els.forEach(el => io.observe(el));
})();


// Add loading=lazy to imgs without it
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('img:not([loading])').forEach(img => img.setAttribute('loading','lazy'));
  });
})();
