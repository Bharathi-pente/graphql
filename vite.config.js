import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base so the built app works when served from a sub-path,
  // e.g. https://<user>.github.io/graphql/ (GitHub Pages)
  base: './',
  server: {
    port: 4001,
    // Forward GraphQL calls from the browser to the Express backend
    proxy: {
      '/graphql': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
});
