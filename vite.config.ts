import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env' : {
      KAKAO_API_KEY: process.env.VITE_KAKAO_API_KEY,
    },
  },
});
