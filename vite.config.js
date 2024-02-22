import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        // isCustomElement: (tag) => ['swiper-slide', 'swiper-container'].includes(tag)
        isCustomElement: (tag) => tag.startsWith('swiper-')
      }
    }
  }
  )],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  base: '/dada-quotation-generator/'
})
