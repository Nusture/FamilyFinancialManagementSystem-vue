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
    port: 8081,
    host: '0.0.0.0',
  },
  // devServer: {
  //   port: 8081,
  //   proxy: {
  //     '/api': {
  //       target: 'http://47.107.103.82:8081',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '/api': ''
  //       }
  //     }
  //   }
  // },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  }
})