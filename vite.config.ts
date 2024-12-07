import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 5173,
    host: true,
  },
  resolve: {
    alias: {
      '/img': '/src/assets/img', // '/img' 경로를 '/src/assets/img'로 매핑
    },
  },
});
