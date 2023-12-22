import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy'
// https://vitejs.dev/config/
export default defineConfig({
  publicDir: false,
  // build: {
  //   copyPublicDir: false
  // },
  plugins: [vue(),
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