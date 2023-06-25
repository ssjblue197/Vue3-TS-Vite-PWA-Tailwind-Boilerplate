import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import { VitePWA } from 'vite-plugin-pwa';


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9009,
    strictPort: false,
    https: false,
    proxy: {},
    cors: {},
  },
  plugins: [
    vue(),
    VitePWA({
      // injectRegister: 'auto',
      injectRegister: null,
      strategies: 'injectManifest',
      srcDir: 'public',
      filename: 'firebase-messaging-sw.js',
      injectManifest: {
        injectionPoint: undefined, 
        // rollupFormat: 'iief',
      },
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html',
      },
      includeAssets: ['favicon.ico', 'robots.txt', '*.svg', '*.{png,ico}'],
      manifest: {
        name: 'Swift POD App',
        short_name: 'SWift POD',
        description: 'Today is your opportunity to build the tomorrow you want',
        display: 'standalone',
        id: '/',
        start_url: '/',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        gcm_sender_id: '520641201951',
      },
      workbox: {
        importScripts: ['firebase-messaging-sw.js'],
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        sourcemap: true,
        swSrc: 'public/firebase-messaging-sw.js',
        swDest: 'dist/firebase-messaging-sw.js',
        cleanupOutdatedCaches: true
      },
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
