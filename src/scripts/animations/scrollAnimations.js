import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations() {
  // 1. Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
    infinite: false,
  });

  // Synchronize Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Smooth anchor link jumping
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement, { offset: -60, duration: 1.4 });
        }
      }
    });
  });

  // 2. Laser Scroll Progress Bar
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? totalScroll / scrollHeight : 0;
      progressBar.style.transform = `scaleX(${progress})`;
    }, { passive: true });
  }

  // 3. Section Reveal Animations
  const sections = document.querySelectorAll('.animate-section');
  sections.forEach((section) => {
    const heading = section.querySelector('.section-header');
    const cards = section.querySelectorAll('.animate-card');

    if (heading) {
      gsap.from(heading, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
      });
    }

    if (cards.length > 0) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        scale: 0.96,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
      });
    }
  });

  // 4. Interactive 3D Tilt for Project & Highlight Cards
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach((card) => {
    const glare = card.querySelector('.card-glare');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

      if (glare) {
        glare.style.opacity = '1';
        glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 245, 212, 0.18) 0%, rgba(168, 85, 247, 0.05) 50%, transparent 80%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      if (glare) {
        glare.style.opacity = '0';
      }
    });
  });

  // 5. Active Section Navigation Tracking
  const navLinks = document.querySelectorAll('.nav-link');
  const observedSections = document.querySelectorAll('section[id]');
  const hudActiveSec = document.getElementById('hud-active-section');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-cyber-cyan', 'border-b-2', 'border-cyber-cyan');
            link.classList.remove('text-slate-400');
          } else {
            link.classList.remove('text-cyber-cyan', 'border-b-2', 'border-cyber-cyan');
            link.classList.add('text-slate-400');
          }
        });

        if (hudActiveSec) {
          hudActiveSec.textContent = `LOC: [//${id.toUpperCase()}]`;
        }
      }
    });
  }, { threshold: 0.35 });

  observedSections.forEach((sec) => navObserver.observe(sec));

  return lenis;
}
