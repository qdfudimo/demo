<template>
  <div class="hello">
    <h1>{{ msg }}{{ name }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
  </div>
</template>

<script>
import myMixin from "./mixin"
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mixins:[myMixin],
  mounted() {
    setTimeout(() => {
      this.setName('Tom') // 通过在组件中调用setName传入参数值，无法传入参数，限制了Mixin的灵活性
    }, 3000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
