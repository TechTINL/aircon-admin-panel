import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [laravel({
    input: 'resources/js/app.jsx',
    refresh: true,
  }), react(), sentryVitePlugin({
    org: "thereisnolack",
    project: "javascript-react"
  })],

  build: {
    sourcemap: true
  }
});