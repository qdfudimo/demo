import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy'
//可以预览 编译的过程
import Inspect from 'vite-plugin-inspect'
import VueDevTools from 'vite-plugin-vue-devtools'
// https://vitejs.dev/config/
export default defineConfig({
  publicDir: false,
  // build: {
  //   copyPublicDir: false
  // },
  plugins: [vue(),
    VueDevTools(), // 添加到这里
    Inspect({
      build: true,
      opne:true//自动打开 /__insepect/页面
    }),
    // VitePluginStyleInject()
    copy({
      targets: [{
        src: 'public/demo/demo.js',
        dest: 'dist/demo123',
        rename: (name, extension, fullPath) => {
          console.log(name, extension, 8888888888888888888888888888888);
          return `${name}-${+new Date()}.${extension}`
        }
      } ],
      hook: 'writeBundle',
      // hook: 'writeBundle',
    })
  ],

})