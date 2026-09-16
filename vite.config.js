import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          animations: ['gsap', 'lenis'],
          ui: ['lucide', 'canvas-confetti']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
