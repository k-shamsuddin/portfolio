/* ==========================================
   NAVBAR — sticky scroll behavior
   ========================================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ==========================================
   CLOUD TRAIL EFFECT
   ========================================== */
(function() {
  let timer;
  document.addEventListener('mousemove', function(e) {
    if(timer) return;
    timer = setTimeout(() => timer = null, 40);

    const cloud = document.createElement('div');
    cloud.className = 'cloud-trail';
    cloud.style.left = e.clientX + 'px';
    cloud.style.top = e.clientY + 'px';
    document.body.appendChild(cloud);

    setTimeout(() => cloud.remove(), 800);
  });
})();

/* ==========================================
   MOBILE ISO-ECOSYSTEM SCROLL ANIMATION
   ========================================== */
const isoEcosystem = document.querySelector('.iso-ecosystem');
if (isoEcosystem) {
  window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) {
      // Use parent wrapper for stable bounds to prevent jitter
      const rect = isoEcosystem.parentElement.getBoundingClientRect();
      const elCenterY = rect.top + rect.height / 2;
      const viewportCenterY = window.innerHeight / 2;
      
      let dist = Math.abs(elCenterY - viewportCenterY) / (window.innerHeight * 0.6);
      dist = Math.max(0, Math.min(1, dist));
      
      // Smoothstep easing for fluid transitions
      const easeDist = dist * dist * (3 - 2 * dist);
      
      // Base scale matching CSS breakpoints
      let baseScale = 0.5;
      if (window.innerWidth <= 380) baseScale = 0.32;
      else if (window.innerWidth <= 440) baseScale = 0.35;
      else if (window.innerWidth <= 580) baseScale = 0.4;
      
      const targetScale = baseScale * 1.15; // Slightly larger when looking flat
      
      const rotX = 15 + (40 * easeDist);
      const rotZ = 0 + (35 * easeDist);
      const currentScale = targetScale - ((targetScale - baseScale) * easeDist);
      
      // MUST include translate(-50%, -50%) to preserve responsive absolute centering
      isoEcosystem.style.transform = `translate(-50%, -50%) scale(${currentScale}) rotateX(${rotX}deg) rotateZ(${rotZ}deg)`;
    } else {
      isoEcosystem.style.transform = ''; // reset on desktop to allow CSS hover
    }
  }, { passive: true });
}

/* ==========================================
   HAMBURGER — mobile menu toggle
   ========================================== */
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('nav-mobile');

hamburger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
  });
});

/* ==========================================
   SCROLL REVEAL — Intersection Observer
   ========================================== */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // animate once
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

/* ==========================================
   STAGGERED REVEAL — cards in a group
   ========================================== */
document.querySelectorAll('.skills-grid .card, .projects-list .card, .certs-list .cert-item').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.07}s`;
});

/* ==========================================
   CONTACT FORM — mailto fallback
   ========================================== */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    const mailtoLink = `mailto:k.shamsuddin.a@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;
  });
}

/* ==========================================
   SMOOTH ACTIVE NAV LINK HIGHLIGHT
   ========================================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--text)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));
