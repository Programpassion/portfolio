import '../styles/main.css';
import { createIcons, icons } from 'lucide';
import confetti from 'canvas-confetti';
import { initHeroCanvas } from './webgl/heroCanvas.js';
import { initScrollAnimations } from './animations/scrollAnimations.js';
import { initCustomCursor } from './components/cursor.js';
import { initTerminal } from './components/terminal.js';
import { initGitHubTelemetry } from './components/githubApi.js';
import { sounds } from './audio/soundEffects.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide icons
  createIcons({ icons });

  // 2. Initialize 3D WebGL Canvas
  initHeroCanvas();

  // 3. Initialize Smooth Scrolling & GSAP Animations
  initScrollAnimations();

  // 4. Initialize Fluid Magnetic Cursor
  initCustomCursor();

  // 5. Initialize Interactive Terminal
  initTerminal();

  // 6. Fetch GitHub Live Telemetry
  initGitHubTelemetry();

  // 7. Sound Toggle Handler
  const soundToggleBtn = document.getElementById('sound-toggle');
  const soundIcon = document.getElementById('sound-icon');
  const soundStatusText = document.getElementById('sound-status-text');

  function updateSoundUI(muted) {
    if (soundStatusText) {
      soundStatusText.textContent = muted ? 'MUTED' : 'AUDIO ON';
    }
    if (soundIcon) {
      soundIcon.setAttribute('data-lucide', muted ? 'volume-x' : 'volume-2');
      createIcons({ icons });
    }
  }

  if (soundToggleBtn) {
    updateSoundUI(sounds.isMuted);
    soundToggleBtn.addEventListener('click', () => {
      const muted = sounds.toggleMute();
      updateSoundUI(muted);
    });
  }

  // 8. Mobile Navigation Drawer
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
      sounds.playClick();
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
        sounds.playClick();
      });
    });
  }

  // 9. Skill Matrix Filter Tabs
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-item');

  skillTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const category = tab.getAttribute('data-category');
      sounds.playClick();

      // Update active tab styles
      skillTabs.forEach((t) => {
        t.classList.remove('bg-cyber-cyan/10', 'text-cyber-cyan', 'border-cyber-cyan');
        t.classList.add('text-slate-400', 'border-transparent');
      });
      tab.classList.add('bg-cyber-cyan/10', 'text-cyber-cyan', 'border-cyber-cyan');
      tab.classList.remove('text-slate-400', 'border-transparent');

      // Filter skill items with opacity fade
      skillCards.forEach((card) => {
        const itemCat = card.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; }, 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });

  // 10. Interactive Contact Form with Confetti Fireworks
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const copyEmailBtn = document.getElementById('copy-email-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sounds.playSuccess();

      // Fire festive cyber confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#00f5d4', '#a855f7', '#38bdf8', '#ffffff']
      });

      if (formStatus) {
        formStatus.textContent = '⚡ Message transmitted successfully! Will respond promptly.';
        formStatus.classList.remove('hidden');
        formStatus.classList.add('text-cyber-cyan');
      }

      contactForm.reset();
      setTimeout(() => {
        if (formStatus) formStatus.classList.add('hidden');
      }, 5000);
    });
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'programpassion@example.com';
      navigator.clipboard.writeText(email).then(() => {
        sounds.playSuccess();
        const originalText = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = `<span class="text-cyber-cyan">COPIED TO CLIPBOARD!</span>`;
        setTimeout(() => {
          copyEmailBtn.innerHTML = originalText;
          createIcons({ icons });
        }, 2000);
      });
    });
  }

  // 11. Real-time Telemetry Loop (Clock, FPS, Latency)
  const clockElement = document.getElementById('hud-clock');
  const fpsElement = document.getElementById('hud-fps');

  let frameCount = 0;
  let lastTime = performance.now();

  function updateTelemetry() {
    // Clock
    if (clockElement) {
      const now = new Date();
      clockElement.textContent = now.toTimeString().split(' ')[0] + ' UTC' + (now.getTimezoneOffset() > 0 ? '-' : '+') + Math.abs(now.getTimezoneOffset() / 60);
    }

    // Live FPS estimation
    frameCount++;
    const currentTime = performance.now();
    if (currentTime - lastTime >= 1000) {
      if (fpsElement) {
        fpsElement.textContent = `${frameCount} FPS`;
      }
      frameCount = 0;
      lastTime = currentTime;
    }

    requestAnimationFrame(updateTelemetry);
  }
  requestAnimationFrame(updateTelemetry);
});
