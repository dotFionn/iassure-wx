import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@shared', replacement: path.resolve(__dirname, '..', 'shared', 'src') }],
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://wx-dev.vateud.de',
        changeOrigin: true,
        // secure: false,
        // ws: true,
      },
    },
  },
});
