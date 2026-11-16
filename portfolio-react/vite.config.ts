import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('three') || id.includes('@react-three') || id.includes('three-stdlib')) {
            return 'vendor-three';
          }
          if (id.includes('framer-motion') || id.includes('gsap')) {
            return 'vendor-motion';
          }
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('react-router-dom') || id.includes('@tanstack')) {
            return 'vendor-react';
          }
        },
      },
    },
  },
});
