
    /* ================= Preloader ================= */
    window.addEventListener('load', ()=>{
      const pre = document.getElementById('preloader');
      pre.style.transition = 'opacity .5s ease';
      pre.style.opacity = 0;
      setTimeout(()=>pre.remove(),600);
    });

    /* ================= Theme Toggle ================= */
    const themeBtn = document.getElementById('themeBtn');
    const root = document.documentElement;
    const saved = localStorage.getItem('site-theme');
    if(saved === 'light') document.body.classList.add('light');
    function updateTheme(){
      const isLight = document.body.classList.toggle('light');
      localStorage.setItem('site-theme', isLight? 'light' : 'dark');
    }
    themeBtn.addEventListener('click', updateTheme);

    /* ================= Mobile menu (tiny) ================= */
    const menuBtn = document.getElementById('menuBtn');
    menuBtn.addEventListener('click', ()=>{
      const nav = document.querySelector('nav ul');
      if(getComputedStyle(nav).display === 'none') nav.style.display = 'flex'; else nav.style.display = 'none';
    });

    /* ================= Typewriter ================= */
    (function(){
      const el = document.getElementById('typewriter');
      const phrases = ['Machine Learning Engineer','Computational Physicist','Scientific Programmer','Freelance Researcher'];
      let p = 0, i = 0, deleting = false;
      function tick(){
        const cur = phrases[p];
        if(!deleting){
          i++;
          el.textContent = cur.slice(0,i);
          if(i === cur.length){deleting = true; setTimeout(tick,1200); return}
        } else {
          i--;
          el.textContent = cur.slice(0,i);
          if(i === 0){deleting = false; p=(p+1)%phrases.length}
        }
        setTimeout(tick, deleting?40:90);
      }
      tick();
    })();

    /* ================= Smooth scroll & active nav ================= */
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', (e)=>{
        const href = a.getAttribute('href');
        if(href.startsWith('#')){
          e.preventDefault();
          const target = document.querySelector(href);
          if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
        }
      });
    });

    const sections = document.querySelectorAll('section, main');
    const navlinks = document.querySelectorAll('.navlink');
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          navlinks.forEach(l=> l.classList.toggle('active', l.getAttribute('href') === '#'+(en.target.id || 'home')));
        }
      });
    },{threshold:0.45});
    sections.forEach(s=>obs.observe(s));

    /* ================= Reveal on scroll ================= */
    const reveals = document.querySelectorAll('.reveal');
    const ro = new IntersectionObserver((es, o)=>{
      es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); o.unobserve(e.target);} })
    },{threshold:0.12});
    reveals.forEach(r=>ro.observe(r));

    /* ================= Project filtering ================= */
    const filters = document.getElementById('filters');
    const projectsGrid = document.getElementById('projectsGrid');
    filters.addEventListener('click', (ev)=>{
      const b = ev.target.closest('button'); if(!b) return;
      filters.querySelectorAll('button').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      const f = b.dataset.filter;
      document.querySelectorAll('.proj').forEach(p=>{
        const tags = (p.getAttribute('data-tags')||'').split(/\s+/);
        if(f==='all' || tags.includes(f)) p.style.display = 'block'; else p.style.display = 'none';
      });
    });

    // ================= Contact form with EmailJS =================
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const mail = form.email.value.trim();
    const msg = form.message.value.trim();

    if (!name || !mail || !msg) {
      alert("Please fill all fields.");
      return;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)) {
      alert("Please enter a valid email.");
      return;
    }

    // Disable button while sending
    const btn = form.querySelector("button");
    btn.disabled = true;
    btn.textContent = "Sending...";

    // Send email using EmailJS
    emailjs.send("service_izh55ug", "template_961hpzf", {
      from_name: name,
      from_email: mail,
      message: msg
    }).then(() => {
      document.getElementById("formMessage").style.display = "block";
      form.reset();
      btn.disabled = false;
      btn.textContent = "Let’s Collaborate";
    }).catch((error) => {
      alert("❌ Oops! Something went wrong. Please try again.");
      console.error("EmailJS Error:", error);
      btn.disabled = false;
      btn.textContent = "Let’s Collaborate";
    });
  });
}


    /* ================= Particles (lightweight) ================= */
    (function(){
      const canvas = document.getElementById('particles');
      const ctx = canvas.getContext('2d');
      let w=canvas.width=innerWidth, h=canvas.height=innerHeight; 
      const parts=[]; const N = Math.round((w*h)/90000);
      function rand(min,max){return Math.random()*(max-min)+min}
      function init(){ parts.length=0; for(let i=0;i<N;i++){ parts.push({x:Math.random()*w,y:Math.random()*h,r:rand(0.4,1.8),vx:rand(-0.2,0.2),vy:rand(-0.1,0.3),a:rand(0.05,0.35)}) }}
      function onResize(){w=canvas.width=innerWidth;h=canvas.height=innerHeight; init()}
      addEventListener('resize', onResize);
      function draw(){ ctx.clearRect(0,0,w,h); for(const p of parts){ p.x += p.vx; p.y += p.vy; p.a += Math.sin(Date.now()/5000 + p.r)/400; if(p.x> w+20) p.x=-20; if(p.x<-20) p.x=w+20; if(p.y>h+20) p.y=-20; ctx.beginPath(); ctx.globalAlpha = 0.9*p.r; ctx.fillStyle = 'rgba(0,217,255,0.08)'; ctx.arc(p.x,p.y,Math.max(1,p.r*3),0,Math.PI*2); ctx.fill(); } requestAnimationFrame(draw); }
      init(); draw();
    })();

    /* ================= Year in footer ================= */
    document.getElementById('year').textContent = new Date().getFullYear();

    /* ================= Accessibility helpers ================= */
    document.addEventListener('keydown', (e)=>{ if(e.key==='/' ){ e.preventDefault(); document.getElementById('viewWork').focus(); } });
