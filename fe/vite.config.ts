import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/SuperAI/', // Reemplaza 'SuperAI' con el nombre de tu repositorio
  build: {
    outDir: 'dist',
  },
  server: {
    open: true,
    proxy: {
      '/data': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/data/, '/data')
      }
    }
  }
});
