<template>
  <div id="app">
    <component :is="remote" v-if="remote" v-bind="$attrs" v-on="$listeners" />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <p>a链接跳转到主项目/其他子项目的页面，页面会刷新，效果不好<a href="/about">parent About</a></p>
      <p>a链接跳转到主项目/其他子项目的页面，页面会刷新，效果不好<a href="/aboutsfsafaf">parent About</a></p>
    </div>
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue/dist/vue.common.js'
import { loadModule } from 'vue3-sfc-loader/dist/vue2-sfc-loader.js'
// import { scan } from 'qr-scanner-wechat';
export default {
  data() {
    return {
      remote: null
    }
  },
  mounted() {
    // console.log(scan);
    const router = this.$router
    const current = this.$route
    // console.log(current);
    const currentRoute = router.resolve(
      "/about",
      current,
    )
    // console.log(currentRoute);
    this.load("/helloWorld.vue")
  },
  methods: {
    // 加载
    async load(url) {
      const com = await loadModule(url, {
        moduleCache: { vue: Vue },
        async getFile(url) {
          //console.log("getFile", url)

          url = /\.(js|mjs|css|less|vue)$/.test(url) ? url : `${url}.${url.startsWith(window.location.origin) ? "vue" : "js"}`
          const type = /.*?\.js|.mjs$/.test(url) ? ".mjs" : /.*?\.vue$/.test(url) ? '.vue' : /.*?\.css$/.test(url) ? '.css' : '.vue';

          const fetched = await fetch(url);
          if (!fetched.ok)
            throw Object.assign(new Error(`${fetched.statusText} ${url}`), { fetched });

          const getContentData = async asBinary => {
            let content = await (asBinary ? fetched.arrayBuffer() : fetched.text());

            // vue3-sfc-loader fails to import before attempting an [export * from "./path"] with ""
            // prefixing any with an import statement to populate the moduleCache
            if (!asBinary && content.includes("export * from")) {
              const matches = content.matchAll(/export \* from (['"])([^'"]+)['"];?/g)
              for (const match of matches) {
                var module = options.pathResolve({ refPath: url, relPath: match[2] })
                if (!options.moduleCache[module]) {
                  content = content.replace(match[0], `import * as vueLoaderExportSupport${match.index} from ${match[1]}${match[2]}${match[1]}\n${match[0]}\n`)
                }
              }
            }

            return content;
          }

          return { getContentData, type }
        },
        addStyle(textContent, url) {
          if (url) {
            let linkElement = document.createElement('link');
            linkElement.setAttribute('rel', 'stylesheet')
            linkElement.setAttribute('type', 'text/css')
            linkElement.setAttribute('href', url)
            document.head.insertBefore(linkElement,
              document.head.getElementsByTagName('style')[0] || null)
          } else if (textContent) {
            let styleElement = document.createElement('style');
            document.head.insertBefore(Object.assign(styleElement, { textContent }),
              document.head.getElementsByTagName('style')[0] || null);
          }
          return null;
        },
        handleModule(type, getContentData, path, options) {
          switch (type) {
            case '.css':
              return options.addStyle(getContentData(false), path);
            case '.less':
              console.error('.......')
          }
        },
        log(type, ...args) {
          console.log(type, ...args);
        }
      })
      this.remote = com
    },
    goToPage(path) {
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

span {
  font-weight: bold;
  color: #2c3e50;
  cursor: pointer;
  margin: 0 15px;
  text-decoration: underline;
}
</style>
