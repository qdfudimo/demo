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
export default {
  data() {
    return {
      remote: null
    }
  },
  mounted() {
    const router = this.$router
    const current = this.$route
    console.log(current);
    const currentRoute = router.resolve(
      "/about",
      current,
    )
    console.log(currentRoute);
    this.load("/helloWorld.vue")
  },
  methods: {
    // 加载
    async load(url) {
      const com = await loadModule(url, {
        moduleCache: {
          vue: Vue,
        },
        // 获取文件
        async getFile(url) {
          const res = await fetch(url)
          if (!res.ok) {
            throw Object.assign(new Error(`${res.statusText}  ${url}`), { res })
          }
          return {
            getContentData: asBinary => (asBinary ? res.arrayBuffer() : res.text()),
          }
        },
        // 添加样式
        addStyle(textContent) {
          const style = Object.assign(document.createElement('style'), { textContent })
          const ref = document.head.getElementsByTagName('style')[0] || null
          document.head.insertBefore(style, ref)
        },
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
