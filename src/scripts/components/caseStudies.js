// Interactive Slide-Over Case Study Drawer
import { sounds } from '../audio/soundEffects.js';

export const CASE_STUDIES = {
  deepfake: {
    id: 'deepfake',
    title: 'Deepfake Detection Research',
    subtitle: 'Neural Forensic Simulation & Artifact Verification',
    badge: 'AI / COMPUTER VISION',
    color: 'cyber-cyan',
    repoUrl: 'https://github.com/Programpassion/deepfake-detection-research',
    metrics: [
      { label: 'Validation Accuracy', value: '98.4%' },
      { label: 'Inference Latency', value: '38ms' },
      { label: 'Artifact Classes', value: '12 Anomaly Types' },
      { label: 'Training Volume', value: '50k+ Frames' }
    ],
    challenge: `
Generative models (GANs and diffusion architectures) have progressed to producing near-flawless facial synthesis. 
Conventional spatial classifiers fail to detect subtle boundary blending, frequency domain inconsistencies, and temporal jitter across consecutive video frames. 
The objective was to engineer a reproducible simulation pipeline capable of exposing microscopic compression and neural rendering artifacts.
`,
    solution: `
Designed a multi-branch hybrid convolutional and frequency-domain architecture implemented in PyTorch:
1. Fast Fourier Transform (FFT) preprocessing layer extracting high-frequency spectral signatures that generative models fail to synthesize accurately.
2. Dual-stream feature extractor combining spatial RGB convolutions with edge-gradient phase analysis.
3. Contrastive loss mechanism trained on simulated synthetic face crops to maximize separation between organic human skin textures and synthesized pixels.
`,
    architecture: ['Python 3.11', 'PyTorch 2.x', 'Torchvision', 'NumPy / SciPy', 'OpenCV', 'FFmpeg'],
    keyTakeaway: 'Proved that spectral frequency domain examination reliably detects facial synthesis artifacts even after aggressive H.264 video compression.'
  },

  eldenring: {
    id: 'eldenring',
    title: 'Elden Ring Aesthetic Engine',
    subtitle: 'Dark Fantasy Atmospheric WebGL Experience',
    badge: 'CREATIVE WEB & 3D',
    color: 'cyber-purple',
    repoUrl: 'https://github.com/Programpassion/EldenRing',
    metrics: [
      { label: 'Target Framerate', value: '60 - 120 FPS' },
      { label: 'GPU Memory Footprint', value: '< 45 MB' },
      { label: 'Particle Density', value: '2,500 Shimmer Nodes' },
      { label: 'Audio Engine', value: '100% Web Audio' }
    ],
    challenge: `
Translating the solemn, majestic grandeur of FromSoftware’s dark fantasy world into an in-browser experience without forcing massive 50MB texture downloads or causing mobile stutter. 
Standard web portfolios feel corporate and flat; the goal was to craft a visceral, sensory showcase that captivates creative directors.
`,
    solution: `
Engineered a lightweight, procedural WebGL scene rendered via Three.js:
1. Dynamic volumetric particle systems emulating Erdtree grace motes and dark embers using additive blending.
2. Custom GLSL noise shaders calculating real-time atmospheric depth without heavy pre-rendered video files.
3. Web Audio API synthesized ambient droning and acoustic feedback loops that adapt to cursor distance.
4. GPU-accelerated post-processing pipeline maintaining a strict 16ms render budget across diverse devices.
`,
    architecture: ['JavaScript (ESNext)', 'Three.js', 'WebGL / GLSL', 'Web Audio API', 'GSAP Timeline', 'Tailwind CSS'],
    keyTakeaway: 'Demonstrated how procedural mathematics, creative art direction, and audio design can create AAA video game-level immersion in a lightweight browser tab.'
  },

  utsah: {
    id: 'utsah',
    title: 'Utsah Fest Platform Architecture',
    subtitle: 'High-Concurrency Event & Operations Engine',
    badge: 'SCALABLE SYSTEMS',
    color: 'cyber-neon',
    repoUrl: 'https://github.com/Programpassion/utsah2026',
    metrics: [
      { label: 'Peak Concurrency', value: '10,000+ Users' },
      { label: 'Uptime Reliability', value: '99.98%' },
      { label: 'Registration Throughput', value: '450 req/sec' },
      { label: 'DB Query Latency', value: '< 15ms' }
    ],
    challenge: `
College and cultural festivals experience severe spike traffic during registration deadlines and live event announcements. 
Legacy platforms suffer database deadlocks, slow ticket verification, and synchronization failures across concurrent student portals.
`,
    solution: `
Architected a resilient full-stack management ecosystem in Python:
1. Asynchronous task queue processing event submissions, ticket generation, and automated validation badges without blocking user threads.
2. Optimistic database concurrency control preventing duplicate seat allocations during high-demand workshop registrations.
3. Real-time portal synchronization keeping stage schedules, leaderboards, and announcements updated instantaneously.
4. Automated reporting dashboard providing coordinators with live attendance telemetry and registration metrics.
`,
    architecture: ['Python', 'FastAPI / AsyncIO', 'PostgreSQL', 'Redis Cache', 'Docker', 'GitHub Actions'],
    keyTakeaway: 'Successfully handled multi-thousand student traffic spikes with zero data loss or registration downtime during fest operations.'
  }
};

export function initCaseStudyDrawer() {
  const drawer = document.getElementById('case-study-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerContent = document.getElementById('drawer-content');
  const closeBtn = document.getElementById('drawer-close-btn');
  const triggerButtons = document.querySelectorAll('.open-case-study');

  if (!drawer || !drawerContent) return;

  function openDrawer(caseStudyId) {
    const study = CASE_STUDIES[caseStudyId];
    if (!study) return;

    sounds.playClick();

    // Populate drawer HTML
    drawerContent.innerHTML = `
      <div class="space-y-8">
        <!-- Header -->
        <div>
          <span class="px-3 py-1 rounded-full text-xs font-mono bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 inline-block mb-3">
            ${study.badge}
          </span>
          <h2 class="text-3xl sm:text-4xl font-display font-extrabold text-white mb-2">
            ${study.title}
          </h2>
          <p class="text-slate-400 font-mono text-xs">
            ${study.subtitle}
          </p>
        </div>

        <!-- Metrics Grid -->
        <div class="grid grid-cols-2 gap-4">
          ${study.metrics
            .map(
              (m) => `
            <div class="glass-panel p-4 rounded-xl border border-white/10 text-center">
              <div class="font-mono text-2xl font-extrabold text-cyber-cyan">${m.value}</div>
              <div class="font-mono text-[10px] text-slate-400 uppercase mt-1">${m.label}</div>
            </div>
          `
            )
            .join('')}
        </div>

        <!-- Challenge -->
        <div class="glass-panel p-6 rounded-2xl border border-white/10">
          <h3 class="text-xs font-mono text-cyber-cyan uppercase tracking-wider mb-2 flex items-center space-x-2">
            <span>●</span>
            <span>THE CHALLENGE</span>
          </h3>
          <p class="text-slate-300 text-sm leading-relaxed font-light">
            ${study.challenge.trim()}
          </p>
        </div>

        <!-- Solution -->
        <div class="glass-panel p-6 rounded-2xl border border-white/10">
          <h3 class="text-xs font-mono text-cyber-purple uppercase tracking-wider mb-2 flex items-center space-x-2">
            <span>●</span>
            <span>ARCHITECTURAL SOLUTION</span>
          </h3>
          <div class="text-slate-300 text-sm leading-relaxed font-light whitespace-pre-line">
            ${study.solution.trim()}
          </div>
        </div>

        <!-- Tech Stack -->
        <div>
          <h3 class="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">ENGINEERING STACK:</h3>
          <div class="flex flex-wrap gap-2">
            ${study.architecture
              .map(
                (tech) => `
              <span class="px-3 py-1 rounded-lg text-xs font-mono bg-slate-800 text-slate-200 border border-white/5">
                ${tech}
              </span>
            `
              )
              .join('')}
          </div>
        </div>

        <!-- Key Takeaway -->
        <div class="p-4 rounded-xl bg-cyber-cyan/5 border border-cyber-cyan/20 text-xs font-mono text-slate-300">
          <span class="text-cyber-cyan font-bold">KEY OUTCOME:</span> ${study.keyTakeaway}
        </div>

        <!-- Action Links -->
        <div class="pt-4 flex flex-wrap gap-4">
          <a href="${study.repoUrl}" target="_blank" rel="noopener noreferrer" class="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-neon text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:shadow-neon-cyan transition-all">
            <span>Inspect Repository</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          </a>
        </div>
      </div>
    `;

    drawer.classList.remove('pointer-events-none');
    drawerBackdrop.classList.remove('opacity-0');
    drawerBackdrop.classList.add('opacity-100');

    const drawerPanel = drawer.querySelector('#drawer-panel');
    if (drawerPanel) {
      drawerPanel.classList.remove('translate-x-full');
      drawerPanel.classList.add('translate-x-0');
    }

    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    sounds.playClick();
    const drawerPanel = drawer.querySelector('#drawer-panel');
    if (drawerPanel) {
      drawerPanel.classList.add('translate-x-full');
      drawerPanel.classList.remove('translate-x-0');
    }

    drawerBackdrop.classList.remove('opacity-100');
    drawerBackdrop.classList.add('opacity-0');

    setTimeout(() => {
      drawer.classList.add('pointer-events-none');
      document.body.style.overflow = '';
    }, 300);
  }

  triggerButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const studyId = btn.getAttribute('data-case-study');
      if (studyId) openDrawer(studyId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !drawer.classList.contains('pointer-events-none')) {
      closeDrawer();
    }
  });
}
