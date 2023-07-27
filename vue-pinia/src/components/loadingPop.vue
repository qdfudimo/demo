<template>
    <div class="content">
        <h4> Login to your account </h4>
        <h4> {{ article }} </h4>
    </div>
</template>
<!-- <script>
import { h, ref, defineAsyncComponent } from 'vue'
export default {
    name: "testSuspense",
    setup(props) {
        const show = ref(false)
        return () => new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(() => h("div", "asyncComponent22222"));
                // reject(() => h("div", "asyncComponent"));
            }, 3000);
        })
    }
}
</script>  -->
<script setup async>
let i = 0
let interVal = setInterval(()=>{
    console.log(++i);
},1000)
const getArticleInfo = async () => {
  await new Promise((resolve,reject) => setTimeout(()=>{
    resolve()
    clearInterval(interVal)
  }, 10000))
  const article = "Vue3 中使用 defineAsyncComponent 延迟加载组件"
  return article
}

const article = await getArticleInfo()
</script>
<style scoped>
.content {
    border: 1px solid #000;
    padding: 8px 16px;
}
</style>
  
  