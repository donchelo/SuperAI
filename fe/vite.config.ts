import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
  },
  server: {
    open: true,
    proxy: {
      '/data': {
        target: 'http://localhost:5173/SuperAI',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/data/, '/data')
      }
    }
  }
});
