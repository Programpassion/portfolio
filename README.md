# ⚡ Programpassion — Next-Level Interactive Developer Portfolio

> An award-winning, Awwwards-caliber interactive developer portfolio built for **[Programpassion](https://github.com/Programpassion)**, engineered for high performance, smooth scroll interactions, WebGL 3D graphics, and automated deployment to **GitHub Pages** (`https://programpassion.github.io`).

![Aesthetic](https://img.shields.io/badge/Aesthetic-Cyber--Editorial-00f5d4?style=for-the-badge)
![Tech](https://img.shields.io/badge/Three.js-WebGL_3D-a855f7?style=for-the-badge)
![Motion](https://img.shields.io/badge/GSAP-ScrollTrigger-38bdf8?style=for-the-badge)
![Smooth](https://img.shields.io/badge/Lenis-Smooth_Scroll-10b981?style=for-the-badge)
![Deploy](https://img.shields.io/badge/Deploy-GitHub_Pages-black?style=for-the-badge&logo=github)

---

## 🌟 Key Features

- 🌌 **Interactive 3D WebGL Hero Canvas**: Custom Three.js particle constellation and cybernetic torus knot responding to mouse velocity, camera parallax, and click shockwaves.
- 📜 **Buttery Smooth Inertia Scrolling**: Powered by `lenis` for 60/120fps frictionless scrolling synchronized with GSAP.
- ⚡ **GSAP ScrollTrigger Choreography**: Kinetic text reveals, staggered section entry, and gyroscopic 3D card tilt with specular glare tracking.
- 💻 **Retro Cyber Terminal HUD**: Fully interactive CLI window (`visitor@programpassion:~$`) with custom commands (`whoami`, `projects`, `skills`, `matrix`, `github`, `contact`, `audio`).
- 🔊 **Web Audio Synthesizer**: Zero external MP3 files needed! Clean acoustic feedback, typing chirps, and success chords synthesized live via the Web Audio API.
- 📡 **Live GitHub Telemetry**: Real-time stats pulled from `https://api.github.com/users/Programpassion` for live public repo and follower count.
- 🎨 **Cyber-Editorial Design System**: Deep onyx `#06070b` palette, frosted glassmorphism, scanlines, noise textures, and laser scroll progress bar.
- 🚀 **1-Click GitHub Actions CI/CD**: Automatic build and deployment to GitHub Pages on every push to `main`.

---

## 🛠️ Tech Stack

- **Core**: Vite, Vanilla JavaScript (ESNext)
- **3D Graphics**: Three.js (WebGL, BufferGeometry, PointsMaterial)
- **Animation**: GSAP 3 (ScrollTrigger) & Lenis Scroll
- **Styling**: Tailwind CSS, PostCSS, Custom Modern CSS Shaders & Glows
- **Icons & Celebration**: Lucide Icons, Canvas Confetti
- **Audio**: Web Audio API (OscillatorNode, GainNode)

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start local development server with hot reload
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 🌐 Deploying to GitHub Pages (`Programpassion.github.io`)

Your portfolio is fully configured with an automated GitHub Pages deployment workflow (`.github/workflows/deploy.yml`).

### Step 1: Initialize Git Repository
In this directory:
```bash
git init
git add .
git commit -m "feat: next-level cyber-editorial interactive portfolio"
```

### Step 2: Link to your GitHub Repository
Create a new repository on GitHub named **`Programpassion.github.io`** (or push to your existing one):
```bash
git remote add origin https://github.com/Programpassion/Programpassion.github.io.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Actions for Pages
1. Go to your repository on GitHub: `https://github.com/Programpassion/Programpassion.github.io`
2. Click **Settings** ➔ **Pages** (in the left sidebar).
3. Under **Build and deployment** ➔ **Source**, select **GitHub Actions**.
4. GitHub Actions will automatically trigger the workflow, build the Vite site, and deploy it to `https://programpassion.github.io` within 60 seconds!

---

## 📁 Architecture Overview

```
Programpassion.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD
├── src/
│   ├── scripts/
│   │   ├── animations/
│   │   │   └── scrollAnimations.js # Lenis + GSAP ScrollTrigger + 3D Tilt
│   │   ├── audio/
│   │   │   └── soundEffects.js     # Web Audio API Synthesizer
│   │   ├── components/
│   │   │   ├── cursor.js           # Magnetic Custom Cursor
│   │   │   ├── githubApi.js        # Live GitHub REST API Telemetry
│   │   │   └── terminal.js         # Interactive Draggable Cyber Terminal
│   │   ├── webgl/
│   │   │   └── heroCanvas.js       # Three.js 3D Particle Constellation
│   │   └── main.js                 # Application Orchestrator
│   └── styles/
│       └── main.css                # Cyber Grid, Glassmorphism, Scanlines
├── index.html                      # Semantic HTML5 Layout & Telemetry HUD
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🛡️ License

MIT © [Programpassion](https://github.com/Programpassion)
