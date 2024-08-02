import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',  // Ajusta esto si tu aplicación se sirve desde un subdirectorio en producción
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html'  // Asegúrate de que Rollup sepa dónde está el archivo de entrada
    }
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
