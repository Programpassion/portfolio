/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#05060a',
          bg: '#080a10',
          surface: '#0e121d',
          card: 'rgba(17, 23, 39, 0.7)',
          border: 'rgba(56, 189, 248, 0.15)',
          hover: 'rgba(56, 189, 248, 0.08)',
          cyan: '#00f5d4',
          neon: '#38bdf8',
          purple: '#a855f7',
          pink: '#f43f5e',
          emerald: '#10b981',
          amber: '#f59e0b'
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
        'laser': 'laser 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        laser: {
          '0%': { opacity: '0.4', transform: 'scaleX(0.8)' },
          '100%': { opacity: '1', transform: 'scaleX(1.05)' },
        }
      },
      boxShadow: {
        'neon-cyan': '0 0 25px -5px rgba(0, 245, 212, 0.4)',
        'neon-purple': '0 0 25px -5px rgba(168, 85, 247, 0.4)',
        'neon-blue': '0 0 25px -5px rgba(56, 189, 248, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
