<template>
  <!-- <testSuspense /> -->
  <h1>{{ msg }}</h1>
  <test-async />
  <!-- <Suspense v-if="show">
    <template #default>
      <login-popup />
    </template>
    <template #fallback>
      <p> Loading正在加载... </p>
    </template>
  </Suspense> -->
  <login-popup v-if="show" />
  <div class="card">
    <button type="button" @click="handelClick">count is {{ count }}</button>
    <button @click="show = true"> Login </button>
  </div>
  <input v-model="inputValue" @input="handelInput" />
  <ul>
    <template v-if="state.todos.length">
      <li v-for="item in state.todos" :key="item.id">{{ item.text }}</li>
    </template>
  </ul>
</template>
<script setup>
import { ref, defineAsyncComponent, h, reactive,toRef } from 'vue'
import { useTodoList } from "../store"
import testAsync from "./test-async.vue"
import testSuspense from "./testSuspense.vue"
/**
 * loader: () => import('./loadingPop.vue') 
 * 必须要使用Suspense包裹 且参数不生效
 */
const loginPopup = defineAsyncComponent({
  // 加载函数
  loader: () => import('./loadingPop.vue'),
  // loader: () =>
  //   new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(() => h("div", "asyncComponent"));
  //       // reject(() => h("div", "asyncComponent"));
  //     }, 3000);
  //   }),
  // 加载异步组件时使用的组件
  loadingComponent: h("div", "loading"),
  // loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 1000,
  // 加载失败后展示的组件
  errorComponent: h("div", "error"),
  // errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 6000,

  // 定义组件是否可挂起 | 默认值：true
  // suspensible: false,
  /**
   *
   * @param {*} error 错误信息对象
   * @param {*} retry 一个函数，用于指示当 promise 加载器 reject 时，加载器是否应该重试
   * @param {*} fail  一个函数，指示加载程序结束退出
   * @param {*} attempts 允许的最大重试次数
   */
  // onError(error, retry, fail, attempts) {
  //   if (error.message.match(/fetch/) && attempts <= 3) {
  //     // 请求发生错误时重试，最多可尝试 3 次
  //     retry()
  //   } else {
  //     // 注意，retry/fail 就像 promise 的 resolve/reject 一样：
  //     // 必须调用其中一个才能继续错误处理。
  //     fail()
  //   }
  // },
})
defineProps({
  msg: String,
})
const count1 = ref(1)
const list = ref([])
const show = ref(false)
// watchEffect(async () => {
//   console.log("执行了");
//   let i = count1.value + 1
//   let res = await Promise.resolve().then(() => {
//     console.log(1111);
//   })
//   list.value.push(1)
// })
const state = useTodoList()
console.log(state.finishedTodos)
console.log(state.todos)
const count = ref(0)
const inputValue = ref("")
const handelInput = () => {
  state.todos.push({
    text: inputValue.value,
    id: state.nextId++,
    isFinished: false
  })
}
const todosRec = reactive({
  arrList:[]
})
const store = {}
const handelClick = () => {
  state.addTodo("在哪啊")
  // list.value.push(2)
  count1.value = 3
  // store.arrList = toRef(todosRec,"arrList")
  // console.log(store.arrList);
  // const storeCopy = reactive(store)
  //toRef解构出来的 再用reactive包裹 .value获取不到了
  // console.log(storeCopy.arrList);
}
</script>
<script>
export default {
  name: "helloWorld"
}
</script>
<style scoped>
.read-the-docs {
  color: #888;
}
</style>
