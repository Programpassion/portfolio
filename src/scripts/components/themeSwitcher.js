// Theme Accent Switcher (Cyan, Violet, Amber, Emerald)
import { sounds } from '../audio/soundEffects.js';

export const THEMES = {
  cyan: {
    name: 'Cyber Cyan',
    primary: '#00f5d4',
    secondary: '#38bdf8',
    glow: 'rgba(0, 245, 212, 0.4)',
    hex: 0x00f5d4
  },
  violet: {
    name: 'Neon Violet',
    primary: '#a855f7',
    secondary: '#ec4899',
    glow: 'rgba(168, 85, 247, 0.4)',
    hex: 0xa855f7
  },
  amber: {
    name: 'Solar Amber',
    primary: '#f59e0b',
    secondary: '#ef4444',
    glow: 'rgba(245, 158, 11, 0.4)',
    hex: 0xf59e0b
  },
  emerald: {
    name: 'Matrix Emerald',
    primary: '#10b981',
    secondary: '#06b6d4',
    glow: 'rgba(16, 185, 129, 0.4)',
    hex: 0x10b981
  }
};

export function initThemeSwitcher(onThemeChangeCallback) {
  const savedTheme = localStorage.getItem('portfolio_theme') || 'cyan';
  applyTheme(savedTheme, false);

  const themeButtons = document.querySelectorAll('.theme-btn');
  themeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const themeKey = btn.getAttribute('data-theme');
      if (themeKey && THEMES[themeKey]) {
        sounds.playClick();
        applyTheme(themeKey, true);
        if (onThemeChangeCallback) {
          onThemeChangeCallback(THEMES[themeKey]);
        }
      }
    });
  });

  return THEMES[savedTheme];
}

export function applyTheme(themeKey, notify = true) {
  const theme = THEMES[themeKey] || THEMES.cyan;
  document.documentElement.style.setProperty('--accent-cyan', theme.primary);
  document.documentElement.style.setProperty('--accent-glow', theme.glow);

  // Update active state on buttons
  const themeButtons = document.querySelectorAll('.theme-btn');
  themeButtons.forEach((btn) => {
    if (btn.getAttribute('data-theme') === themeKey) {
      btn.classList.add('ring-2', 'ring-white', 'scale-110');
    } else {
      btn.classList.remove('ring-2', 'ring-white', 'scale-110');
    }
  });

  localStorage.setItem('portfolio_theme', themeKey);

  // Dispatch custom window event
  window.dispatchEvent(new CustomEvent('themeChanged', { detail: theme }));
}
