import { sounds } from '../audio/soundEffects.js';

export function initTerminal() {
  const terminalWindow = document.getElementById('terminal-modal');
  const terminalBody = document.getElementById('terminal-output');
  const terminalInput = document.getElementById('terminal-input');
  const terminalHeader = document.getElementById('terminal-header');
  const openButtons = document.querySelectorAll('.open-terminal-btn');
  const closeBtn = document.getElementById('terminal-close-btn');
  const minimizeBtn = document.getElementById('terminal-min-btn');

  if (!terminalWindow || !terminalInput || !terminalBody) return;

  const commandHistory = [];
  let historyIndex = -1;

  // Initial welcome message
  const welcomeText = `
<span class="text-cyber-cyan font-bold">╔════════════════════════════════════════════════════════════════╗</span>
<span class="text-cyber-cyan font-bold">║  PROGRAMPASSION // NEURAL CYBERNETIC WORKSTATION v2.6.0       ║</span>
<span class="text-cyber-cyan font-bold">╚════════════════════════════════════════════════════════════════╝</span>
Type <span class="text-cyber-cyan font-bold">'help'</span> to inspect available subsystem commands.
`;
  terminalBody.innerHTML = welcomeText;

  // Open & Close handlers
  openButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      terminalWindow.classList.remove('hidden');
      terminalWindow.classList.add('flex');
      terminalInput.focus();
      sounds.playSuccess();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      terminalWindow.classList.add('hidden');
      terminalWindow.classList.remove('flex');
      sounds.playClick();
    });
  }

  if (minimizeBtn) {
    minimizeBtn.addEventListener('click', () => {
      terminalWindow.classList.add('hidden');
      terminalWindow.classList.remove('flex');
      sounds.playClick();
    });
  }

  // Draggable Terminal
  if (terminalHeader) {
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    terminalHeader.addEventListener('mousedown', (e) => {
      if (e.target.closest('button')) return;
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;

      const rect = terminalWindow.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;

      terminalWindow.style.position = 'fixed';
      terminalWindow.style.margin = '0';
      terminalWindow.style.left = `${initialLeft}px`;
      terminalWindow.style.top = `${initialTop}px`;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      terminalWindow.style.left = `${Math.max(10, Math.min(window.innerWidth - 320, initialLeft + dx))}px`;
      terminalWindow.style.top = `${Math.max(10, Math.min(window.innerHeight - 200, initialTop + dy))}px`;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });
  }

  // Commands definition
  const commands = {
    help: () => `
<span class="text-cyber-cyan font-bold">AVAILABLE COMMANDS:</span>
  <span class="text-cyber-neon">whoami</span>       - Display engineer profile & background
  <span class="text-cyber-neon">projects</span>     - List key engineering & simulation projects
  <span class="text-cyber-neon">skills</span>       - Inspect core technical stack & architectures
  <span class="text-cyber-neon">github</span>       - Query live repository telemetry
  <span class="text-cyber-neon">matrix</span>       - Activate digital neural rain sequence
  <span class="text-cyber-neon">contact</span>      - Transmit communication frequencies
  <span class="text-cyber-neon">audio</span>        - Toggle synthesized acoustic engine
  <span class="text-cyber-neon">clear</span>        - Flush terminal buffer
`,

    whoami: () => `
<span class="text-slate-300">
<span class="text-cyber-cyan font-bold">OPERATOR:</span> Programpassion
<span class="text-cyber-neon font-bold">SPECIALIZATION:</span> AI & Deep Learning Simulation • Creative 3D Web • Systems Engineering
<span class="text-slate-400">Passionate developer building high-performance applications, neural forensic models (Deepfake Detection), 
and immersive interactive visual platforms. Driven by bleeding-edge creative coding and clean architecture.</span>
</span>
`,

    projects: () => `
<span class="text-cyber-cyan font-bold">INDEXED REPOSITORIES:</span>
1. <span class="text-cyber-emerald font-bold">deepfake-detection-research</span> [Python/PyTorch]
   Simulation project on forensic deepfake artifact detection and neural verification.
2. <span class="text-cyber-amber font-bold">EldenRing</span> [JavaScript/WebGL]
   Dark fantasy aesthetic showcase, rich atmosphere and interactive visual canvas.
3. <span class="text-cyber-purple font-bold">utsah2026 / utsahfest</span> [Python/Full-Stack]
   Scalable fest platform with automated operations, scheduling, and portal management.
`,

    skills: () => `
<span class="text-cyber-cyan font-bold">TECHNICAL CAPABILITIES:</span>
• <span class="text-cyber-neon">Machine Learning & AI:</span> Python, PyTorch, Computer Vision, Deepfake Forensics, Data Pipelines
• <span class="text-cyber-neon">Creative Frontend & 3D:</span> Three.js, WebGL, GSAP, JavaScript (ESNext), Tailwind CSS, Lenis
• <span class="text-cyber-neon">Systems & Backend:</span> Python, Node.js, REST APIs, Git, Cloud Architecture
`,

    contact: () => `
<span class="text-cyber-cyan font-bold">COMMUNICATION CHANNELS:</span>
• GitHub: <a href="https://github.com/Programpassion" target="_blank" class="text-cyber-neon underline">github.com/Programpassion</a>
• Email: Direct message via the contact module below
`,

    audio: () => {
      const isMuted = sounds.toggleMute();
      return `<span class="text-cyber-neon">Audio Engine: ${isMuted ? 'MUTED [SILENT]' : 'ENABLED [SYNTH ACTIVE]'}</span>`;
    },

    sudo: () => `<span class="text-rose-500 font-bold">Permission Denied: User is not in sudoers file. Incident reported to cyber-police.</span>`,

    matrix: () => {
      runMatrixEffect(terminalBody);
      return `<span class="text-emerald-400">Streaming neural cipher buffer...</span>`;
    },

    clear: () => {
      terminalBody.innerHTML = '';
      return '';
    }
  };

  // Keyboard input handler
  terminalInput.addEventListener('keydown', (e) => {
    sounds.playKeypress();

    if (e.key === 'Enter') {
      const rawInput = terminalInput.value.trim();
      const [cmd, ...args] = rawInput.toLowerCase().split(' ');

      if (rawInput) {
        commandHistory.push(rawInput);
        historyIndex = commandHistory.length;
      }

      // Append command prompt line
      const promptLine = document.createElement('div');
      promptLine.className = 'mt-2 text-slate-300';
      promptLine.innerHTML = `<span class="text-cyber-cyan">visitor@programpassion:~$</span> <span class="text-white">${escapeHtml(rawInput)}</span>`;
      terminalBody.appendChild(promptLine);

      // Execute command
      if (cmd) {
        if (cmd === 'clear') {
          commands.clear();
        } else if (commands[cmd]) {
          const result = commands[cmd](args);
          if (result) {
            const resultLine = document.createElement('div');
            resultLine.className = 'text-slate-300 text-sm leading-relaxed';
            resultLine.innerHTML = result;
            terminalBody.appendChild(resultLine);
          }
          sounds.playSuccess();
        } else {
          const errorLine = document.createElement('div');
          errorLine.className = 'text-rose-400 text-sm';
          errorLine.innerHTML = `command not recognized: <span class="text-white">${escapeHtml(cmd)}</span>. Type <span class="text-cyber-cyan underline cursor-pointer" onclick="document.getElementById('terminal-input').value='help';">help</span> for assistance.`;
          terminalBody.appendChild(errorLine);
        }
      }

      terminalInput.value = '';
      terminalBody.scrollTop = terminalBody.scrollHeight;
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    }
  });

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function runMatrixEffect(container) {
    const chars = '01010101XYZΩλπµ§±010101010111001';
    let lines = 0;
    const interval = setInterval(() => {
      const line = document.createElement('div');
      line.className = 'text-emerald-500 font-mono text-xs opacity-80';
      let str = '';
      for (let i = 0; i < 45; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
      }
      line.textContent = str;
      container.appendChild(line);
      container.scrollTop = container.scrollHeight;
      lines++;
      if (lines > 8) clearInterval(interval);
    }, 80);
  }
}
