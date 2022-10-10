import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [VitePWA({
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true
    },
    injectRegister: 'auto',
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      runtimeCaching:[
        {
          urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
          handler: 'CacheFirst',
          options: {
          cacheName: 'react-bootstrap',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
            },
          cacheableResponse: {
            statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /^https:\/\/fdn2\.gsmarena\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gsm-arena-img',
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            },
          }
        }
      ]
    },
    manifest: {
      name: 'CellStore',
      short_name: 'CellStore',
      description: 'your favorite cell store',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'playstore-icon.png',
          sizes: '48x48 72x72 128x128 192x192 256x256 512x512',
          type: 'image/png'
        }
      ]
    }
  })
],
  server: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:3001"
    }
  },
  build: {
    chunkSizeWarningLimit: 700,
  },
})
