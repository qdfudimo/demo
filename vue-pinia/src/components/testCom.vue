<template>
    <h2>测试 testSuspense</h2>
</template>
<script setup>
import { reactive, ref, watchEffect, h, createVNode, getCurrentInstance, render } from "vue";
const show = ref(false)
console.log(getCurrentInstance(),222);
</script>