const nav = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

window.addEventListener('scroll', () => {
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

if (navToggle && navMobile) {
  navToggle.addEventListener('click', () => {
    navMobile.classList.toggle('open');
  });
}

document.querySelectorAll('.nav-mobile a').forEach(a => {
  a.addEventListener('click', () => navMobile.classList.remove('open'));
});

const revealNodes = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-in');
  });
}, { threshold: 0.15 });
revealNodes.forEach(el => io.observe(el));

const cookie = document.getElementById('cookieBanner');
const accept = document.getElementById('cookieAccept');
const decline = document.getElementById('cookieDecline');
if (cookie && !localStorage.getItem('alx_cookie_choice')) {
  setTimeout(() => cookie.classList.add('visible'), 800);
}
if (accept) accept.addEventListener('click', () => { localStorage.setItem('alx_cookie_choice', 'accept'); cookie.classList.remove('visible'); });
if (decline) decline.addEventListener('click', () => { localStorage.setItem('alx_cookie_choice', 'decline'); cookie.classList.remove('visible'); });

const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    let ok = true;
    form.querySelectorAll('[required]').forEach(input => {
      const err = input.parentElement.querySelector('.error');
      if (!input.value.trim() || (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value))) {
        ok = false;
        if (err) err.style.display = 'block';
      } else if (err) {
        err.style.display = 'none';
      }
    });
    if (!ok) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    form.innerHTML = '<h3>Thank you for your message.</h3><p>Our team will respond via email within 1-2 business days.</p>';
  });
}

const counts = document.querySelectorAll('[data-count]');
const animateCount = (el) => {
  const target = Number(el.dataset.count || 0);
  let current = 0;
  const step = Math.max(1, Math.floor(target / 40));
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
      return;
    }
    el.textContent = current.toLocaleString();
  }, 22);
};
const countIO = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counts.forEach(c => countIO.observe(c));
