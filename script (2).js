/* ================= EmailJS init =================
   Only the PUBLIC key belongs here — it's designed to be exposed
   client-side. Never put your EmailJS PRIVATE key in front-end code;
   the old site's HTML comments did this, which effectively published it. */
(function(){
  if (window.emailjs) emailjs.init("webgcUOQrLxdcK_Vd");
})();

/* ================= Mobile menu ================= */
const menuBtn = document.getElementById('menuBtn');
menuBtn?.addEventListener('click', () => {
  const nav = document.querySelector('nav ul');
  nav.style.display = getComputedStyle(nav).display === 'none' ? 'flex' : 'none';
});

/* ================= Active nav on scroll ================= */
const navlinks = document.querySelectorAll('.navlink');
const sections = document.querySelectorAll('section[id]');
const navObs = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      navlinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id));
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => navObs.observe(s));

/* ================= Reveal on scroll ================= */
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); }
  });
}, { threshold: 0.1 });
reveals.forEach(r => revealObs.observe(r));

/* ================= Contact form ================= */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const mail = form.email.value.trim();
    const msg = form.message.value.trim();

    if (!name || !mail || !msg) { alert('Please fill all fields.'); return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)) { alert('Please enter a valid email.'); return; }

    const btn = form.querySelector('button');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    // Replace with your own EmailJS service ID and template ID.
    emailjs.send('service_izh55ug', 'template_961hpzf', {
      from_name: name,
      from_email: mail,
      message: msg
    }).then(() => {
      document.getElementById('formMessage').style.display = 'block';
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Send message';
    }).catch((error) => {
      alert('Something went wrong. Please try again or email me directly.');
      console.error('EmailJS error:', error);
      btn.disabled = false;
      btn.textContent = 'Send message';
    });
  });
}

/* ================= Footer year ================= */
document.getElementById('year').textContent = new Date().getFullYear();
