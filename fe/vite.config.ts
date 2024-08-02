import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/SuperAI/',  // Ajusta esto según el subdirectorio desde el cual se sirve la app en producción
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
