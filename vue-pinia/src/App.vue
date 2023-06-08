<script setup>
import { reactive ,ref} from "vue";
import HelloWorld from './components/HelloWorld.vue';

const handelClick = () => {
  // codeList.push(4)
  curCode.value = 4
}
const codeList = reactive([1, 2, 3])
const curCode = ref(3)
const removeEl = (el) => {
  // 在绑定元素上存储父级元素
  el._parentNode = el.parentNode
  // 在绑定元素上存储一个注释节点
  el._placeholderNode = document.createComment("auth")
  // 使用注释节点来占位
  el.parentNode?.replaceChild(el._placeholderNode, el)
}

const addEl = (el) => {
  // 替换掉给自己占位的注释节点
  el._parentNode?.replaceChild(el, el._placeholderNode)
}

const hasPermission = (value) => {
  return codeList.includes(value)
}
const vAuth = {
  mounted: (el, binding) => {
    const value = binding.value
    if (!value) return
    if (!hasPermission(value)) {
      // 挂载的时候没有权限把元素删除
      removeEl(el)
    }
  },
  updated(el, binding) {
    console.dir(el);
    console.log("更新了");
    let update = () => {
      let valueNotChange = binding.value == binding.oldValue
      let oldHasPermission = hasPermission(binding.oldValue)
      let newHasPermission = hasPermission(binding.value)
      let permissionNotChange = oldHasPermission === newHasPermission
      if (valueNotChange && permissionNotChange) return
      if (newHasPermission) {
        addEl(el)
      } else {
        removeEl(el)
      }
    };
    if (el._watchEffect) {
      update()
    } else {
      el._watchEffect = watchEffect(() => {
        update()
      })
    }
  },
  beforeUnmount(el, binding, vnode, prevVnode) {
    console.log("卸载了");
  },
}

</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <button hover-class="button-hover" v-auth="curCode">
      增加数据权限测试
    </button>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <button hover-class="button-hover" @click="handelClick">
    点击更新
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
