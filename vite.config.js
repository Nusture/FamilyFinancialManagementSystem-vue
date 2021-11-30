// import vue from '@vitejs/plugin-vu
import vue from '@vitejs/plugin-vue';
import {
  resolve
} from 'path'
import {
  defineConfig
} from 'vite'

const path = require('path')
export default defineConfig({
  base: './',
  plugins: [vue()],
  server: {
    cors: true,
    open: true,
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  }
})