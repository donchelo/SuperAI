import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  base: '/SuperAI/',  // Ajusta la base URL aquí
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
        target: 'http://localhost:5173',  // Asegúrate de que este sea el puerto correcto
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/data/, '')
      }
    }
  }
});
