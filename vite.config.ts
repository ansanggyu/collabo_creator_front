import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    proxy: {
      '/api' : {
        target: 'http://43.201.252.29:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/,''),
      },
    },
    // port: 5173,
    host: true,
  },
});
