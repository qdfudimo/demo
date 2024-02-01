<template>
    <div>{{ count }}</div>
    <el-button @click="handelClick">点击</el-button>
    <!-- <test-update :index="doIndex(2)" v-if="count<2"></test-update> -->
</template>
<script setup>
import { ref, defineProps, defineExpose } from "vue";
const props = defineProps(["index"])
const count = ref(0)
const handelClick = () => {
    count.value++
}
const doIndex = (index)=>{
  console.log(index,"测试数据");
}
</script>
<!-- <script>
export default {
    name: "testUpdate"
}
</script> -->