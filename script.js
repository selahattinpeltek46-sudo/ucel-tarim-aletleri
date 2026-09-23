// Navbar background intensifies on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 20
    ? 'rgba(27, 27, 29, 0.98)'
    : 'rgba(27, 27, 29, 0.96)';
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Traktörüme uygun ekipman formu -> WhatsApp
const tractorForm = document.getElementById('tractorForm');
if (tractorForm) {
  tractorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(tractorForm);
    const get = (k) => (fd.get(k) || '').toString().trim();
    const ad = get('ad');
    const telefon = get('telefon');
    const marka = get('marka');
    const model = get('model');
    const beygir = get('beygir');
    const is_ = get('is');
    const ekipman = get('ekipman');

    let msg = `Merhaba, ben ${ad || 'bir çiftçi'}.`;
    if (telefon) msg += ` Telefon: ${telefon}.`;
    if (marka || model) msg += ` Traktörüm: ${[marka, model].filter(Boolean).join(' ')}.`;
    if (beygir) msg += ` Beygir gücü: ${beygir}.`;
    if (is_) msg += ` Yapacağım iş: ${is_}.`;
    if (ekipman) msg += ` İhtiyaç duyduğum ekipman: ${ekipman}.`;
    msg += ' Bana uygun ekipmanı birlikte belirleyelim.';

    const url = 'https://wa.me/905324803051?text=' + encodeURIComponent(msg);
    window.open(url, '_blank', 'noopener');
  });
}

// Scroll-reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));
