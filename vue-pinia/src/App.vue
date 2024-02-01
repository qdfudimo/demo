<script setup>
import { reactive, ref, watchEffect, h,createVNode, getCurrentInstance, render, watch } from "vue";
import HelloWorld from './components/HelloWorld.vue';
import testPage from "./components/test-page.vue";
import testCom from "./components/testCom.vue";
import vAuth from "./directive/permission";
const vNode = createVNode(testCom,{num:1});
// console.log(getCurrentInstance());
console.log(vNode);
const container = document.createElement('div');
render(vNode, container);
console.log(container);
const handelClick = (flag) => {
  // codeList.push(4)
  if (flag) {
    curCode.value = 3
    return
  }
  curCode.value = 4
}
const curCode = ref(3)
const divE = ref(null)
watch(divE,(o,n)=>{
  console.log(o,n);
})
const headerRender = ({ column }) => h("div", null, `${column.label}(渲染函数自定义表头)`)
</script>

<template>
  <component :is="headerRender" :column="{ 'label': '自定义' }" />
  <test-page>
    <div>2222</div>
    <div>22200000</div>
  </test-page>
  <!-- <testCom /> -->
  <div ref="divE">
    <button hover-class="button-hover" v-auth="curCode">
      增加数据权限测试
    </button>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <button hover-class="button-hover" @click="() => handelClick(false)">
    点击更新
  </button>
  <button hover-class="button-hover" @click="() => handelClick(true)">
    再次点击更新
  </button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
