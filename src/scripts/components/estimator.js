// Interactive Project Scope & Timeline Estimator
import { sounds } from '../audio/soundEffects.js';

export function initProjectEstimator() {
  const typeSelector = document.getElementById('est-type');
  const tierSelector = document.getElementById('est-tier');
  const addonCheckboxes = document.querySelectorAll('.est-addon');
  const weeksDisplay = document.getElementById('est-weeks');
  const costDisplay = document.getElementById('est-estimate');
  const bookScopeBtn = document.getElementById('est-book-btn');
  const deliverablesContainer = document.getElementById('est-deliverables');

  if (!typeSelector || !tierSelector || !weeksDisplay) return;

  const baseData = {
    'ai-ml': {
      name: 'AI & Neural Forensic Model',
      baseWeeks: 3.5,
      baseEstimate: '$4,500 - $7,500',
      deliverables: [
        'Data preprocessing & synthetic artifact pipeline',
        'Custom PyTorch neural architecture & training loop',
        'Model validation metrics & ablation reports',
        'Inference REST API container (Docker)'
      ]
    },
    'creative-3d': {
      name: 'Immersive 3D WebGL Experience',
      baseWeeks: 2.5,
      baseEstimate: '$3,800 - $6,500',
      deliverables: [
        'Three.js WebGL scene with custom lighting & cameras',
        '60/120fps physics & fluid mouse parallax',
        'GSAP ScrollTrigger kinetic choreography',
        'Responsive mobile fallback & touch support'
      ]
    },
    'fullstack': {
      name: 'Full-Stack Scalable Platform',
      baseWeeks: 4.0,
      baseEstimate: '$5,000 - $9,500',
      deliverables: [
        'FastAPI/Node.js microservices & secure endpoints',
        'Relational/NoSQL database schema with migrations',
        'High-speed reactive frontend & admin portal',
        'Automated authentication, logging, and rate limiting'
      ]
    },
    'audit': {
      name: 'Architecture & Performance Advisory',
      baseWeeks: 1.5,
      baseEstimate: '$2,000 - $3,500',
      deliverables: [
        'End-to-end codebase & bottleneck audit',
        '3D/WebGL rendering performance profiling',
        'Comprehensive architectural roadmap & refactoring PRs'
      ]
    }
  };

  const tierMultipliers = {
    'mvp': { multiplier: 0.8, label: 'Rapid Prototype (MVP)' },
    'production': { multiplier: 1.0, label: 'Production Launch' },
    'enterprise': { multiplier: 1.4, label: 'Enterprise Grade Architecture' }
  };

  function calculateEstimate() {
    const selectedType = typeSelector.value || 'creative-3d';
    const selectedTier = tierSelector.value || 'production';
    const currentData = baseData[selectedType] || baseData['creative-3d'];
    const tierData = tierMultipliers[selectedTier] || tierMultipliers['production'];

    let totalWeeks = currentData.baseWeeks * tierData.multiplier;
    const activeAddons = [];

    addonCheckboxes.forEach((cb) => {
      if (cb.checked) {
        totalWeeks += parseFloat(cb.getAttribute('data-weeks') || '0.5');
        activeAddons.push(cb.getAttribute('data-name') || cb.value);
      }
    });

    const minWeeks = Math.max(1, Math.round(totalWeeks));
    const maxWeeks = minWeeks + 1;

    // Update displays
    weeksDisplay.textContent = `${minWeeks} - ${maxWeeks} Weeks`;
    if (costDisplay) {
      costDisplay.textContent = currentData.baseEstimate;
    }

    // Render deliverables
    if (deliverablesContainer) {
      deliverablesContainer.innerHTML = currentData.deliverables
        .map((d) => `
          <li class="flex items-start space-x-2 text-xs font-mono text-slate-300">
            <span class="text-cyber-cyan font-bold mt-0.5">✓</span>
            <span>${d}</span>
          </li>
        `)
        .join('');
    }

    return {
      type: currentData.name,
      tier: tierData.label,
      weeks: `${minWeeks} - ${maxWeeks} Weeks`,
      estimate: currentData.baseEstimate,
      addons: activeAddons
    };
  }

  // Event listeners
  typeSelector.addEventListener('change', () => {
    sounds.playClick();
    calculateEstimate();
  });

  tierSelector.addEventListener('change', () => {
    sounds.playClick();
    calculateEstimate();
  });

  addonCheckboxes.forEach((cb) => {
    cb.addEventListener('change', () => {
      sounds.playClick();
      calculateEstimate();
    });
  });

  // Initial calculation
  calculateEstimate();

  // Book Scope Button: Scroll to contact form and populate brief
  if (bookScopeBtn) {
    bookScopeBtn.addEventListener('click', () => {
      const estimate = calculateEstimate();
      sounds.playSuccess();

      const messageInput = document.getElementById('message-input');
      const contactSection = document.getElementById('contact');

      if (messageInput) {
        const addonsText = estimate.addons.length > 0 ? `\n• Add-ons: ${estimate.addons.join(', ')}` : '';
        messageInput.value = `[PROJECT SCOPE BRIEF]\n• Focus: ${estimate.type}\n• Scope: ${estimate.tier}\n• Target Timeline: ${estimate.weeks}${addonsText}\n\nHi Programpassion, I'd like to discuss kickstarting this project. Let's schedule a discovery conversation.`;
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (messageInput) messageInput.focus();
        }, 800);
      }
    });
  }
}
