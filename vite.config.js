// import vue from '@vitejs/plugin-vu
import vue from '@vitejs/plugin-vue';
function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}


const { resolve } = require('path')
export default {
    base: './',
    plugins: [vue()],
    resolve: {
      alias: {
          '/@/': resolve(__dirname, 'src'),
      },
  },
    // optimizeDeps: {
    //     include: ['schart.js']
    // }
}



// export default defineConfig({
//     base: "",
//     plugins:[vue()],
//     resolve: {
//         alias: {
//           "/@": pathResolve("src"),
//         }
//     },
//     optimizeDeps: {
//         include: ['axios'],
//     },
//     build: {
//       target: 'modules',
//       outDir: 'dist',
//       assetsDir: 'assets',
//       minify: 'terser' // 混淆器
//     },
//     server: {
//         cors: true,
//         open: true,
//         proxy: {
//           '/api': {
//               target: 'http://192.168.99.223:3000',   //代理接口
//               changeOrigin: true,
//               rewrite: (path) => path.replace(/^\/api/, '')
//           }
//         }
//     }
// });