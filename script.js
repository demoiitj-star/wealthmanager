/* ═══════════════════════════════════════════════════════════
   CHINMAY SAHU — Premium Animated Interactions
   ═══════════════════════════════════════════════════════════ */

// ── Welcome Screen ─────────────────────────────────────────
(function initWelcomeScreen() {
  const welcomeScreen = document.getElementById('welcome-screen');
  if (welcomeScreen) {
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      // Add hide classes to trigger advanced CSS transitions
      welcomeScreen.classList.add('hide');
      const content = welcomeScreen.querySelector('.welcome-content');
      if (content) content.classList.add('hide');
      
      document.body.style.overflow = '';
      
      // Remove from DOM after transitions complete
      setTimeout(() => welcomeScreen.remove(), 1500);
    }, 2500);
  }
})();

// ── Mobile Nav Toggle ──────────────────────────────────────
const toggleButton = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.site-nav');

if (toggleButton && nav) {
  toggleButton.addEventListener('click', () => {
    nav.classList.toggle('open');
    const isOpen = nav.classList.contains('open');
    toggleButton.setAttribute('aria-expanded', isOpen);
    toggleButton.textContent = isOpen ? '✕' : '☰';
  });

  // Close nav when clicking a link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggleButton.textContent = '☰';
    });
  });
}

// ── Auto Year ──────────────────────────────────────────────
const yearNode = document.getElementById('year');
if (yearNode) yearNode.textContent = new Date().getFullYear();

// ── Form Handler ───────────────────────────────────────────
const form = document.getElementById('contactForm') || document.querySelector('form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('senderName')?.value || '';
    const email = document.getElementById('senderEmail')?.value || '';
    const subject = document.getElementById('messageSubject')?.value || 'New Inquiry';
    const message = document.getElementById('messageBody')?.value || '';
    
    // Construct email parameters
    const emailTo = 'wealthmanagercs@gmail.com';
    const emailSubject = encodeURIComponent(`Website Inquiry: ${subject}`);
    const emailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    
    // Construct WhatsApp message
    const waNumber = '916232552467';
    const waText = encodeURIComponent(`Hello Chinmay,\n\nI am ${name} (${email}).\n\nSubject: ${subject}\n\n${message}`);
    
    // 1. Open WhatsApp in a new tab
    window.open(`https://wa.me/${waNumber}?text=${waText}`, '_blank');
    
    // 2. Trigger Email client in the same window (to avoid popup blockers)
    window.location.href = `mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`;
    
    // Update button UI
    const button = form.querySelector('button');
    if (button) {
      button.textContent = '✓ Redirecting...';
      button.disabled = true;
      button.style.opacity = '0.7';
    }
  });
}

// ── Touch Feedback ─────────────────────────────────────────
document.querySelectorAll('.btn, .mobile-bottom-nav a, .nav-cta').forEach((el) => {
  el.addEventListener('pointerdown', () => el.classList.add('is-pressed'));
  const clear = () => el.classList.remove('is-pressed');
  el.addEventListener('pointerup', clear);
  el.addEventListener('pointercancel', clear);
  el.addEventListener('pointerleave', clear);
});

// ── Scroll Progress Bar ────────────────────────────────────
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.style.transform = 'scaleX(0)';
  document.body.prepend(bar);

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    bar.style.transform = `scaleX(${progress})`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
})();

// ── Intersection Observer — Reveal on Scroll ───────────────
(function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  reveals.forEach((el) => observer.observe(el));
})();

// ── Scroll Animation on Crystal Background ──────────────────
(function initCrystalScroll() {
  const crystalRing = document.querySelector('.crystal-ring');
  if (!crystalRing) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const rotation = scrollY * 0.03;
    const translateY = -50 + (scrollY * 0.02);
    crystalRing.style.transform = `translate(-50%, ${translateY}%) rotate(${rotation}deg) scale(1.05)`;
  }, { passive: true });
})();

// ── Floating Particles (Canvas) ────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  const particles = [];
  const PARTICLE_COUNT = 40;
  const COLORS = [
    'rgba(140, 92, 255, 0.35)',
    'rgba(189, 165, 255, 0.25)',
    'rgba(52, 211, 153, 0.2)',
    'rgba(255, 255, 255, 0.15)',
  ];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }

  function init() {
    resize();
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle());
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > width) p.dx *= -1;
      if (p.y < 0 || p.y > height) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  init();
  draw();
  window.addEventListener('resize', resize);
})();

// ── Tilt Effect on Cards ───────────────────────────────────
(function initCardTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.card, .metric-card, .blog-card, .visual-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

// ── Smooth Counter Animation ───────────────────────────────
(function initCounters() {
  const counters = document.querySelectorAll('.metric-card strong');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const text = el.textContent.trim();
        const match = text.match(/^([\d.]+)(\+?)$/);

        if (match) {
          const target = parseFloat(match[1]);
          const suffix = match[2] || '';
          const isFloat = text.includes('.');
          const duration = 1200;
          const start = performance.now();

          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;
            el.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
            if (progress < 1) requestAnimationFrame(update);
          }

          requestAnimationFrame(update);
        }

        observer.unobserve(el);
      });
    },
    { threshold: 0.3 }
  );

  counters.forEach((el) => observer.observe(el));
})();
