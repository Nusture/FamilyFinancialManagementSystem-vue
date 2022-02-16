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
  base: '/',
  plugins: [vue()],
  // server: {
  //   cors: true,
  //   host: '0.0.0.0',
  // },
  // devServer: {
  //   port: 8002,
  //   open: true,
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
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8081/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
        ws: false
      },

    }

  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  }
})