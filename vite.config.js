import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    // Generate manifest for better caching
    manifest: true,
    // Optimize for PWA
    rollupOptions: {
      output: {
        // Ensure consistent chunk names for better caching
        manualChunks: {
          vendor: ['vue'],
          primevue: ['primevue', '@primevue/themes', 'primeicons']
        }
      }
    }
  },
  // PWA-specific settings
  server: {
    // Enable HTTPS for PWA testing (optional)
    // https: true
  }
})
