<template>
    <div :index="resoleRoute(item.path, 3)" v-if="hasChildren(item.children)">
        <span>{{ item.meta.title }}</span>
    </div>
    <div :index="resoleRoute(item.path, 1)" v-else>
        <span>{{ item.meta.title }}{{ count }}</span>
        <sub-menus v-for="cur in item.children" :key="cur.path" :item="cur"
            :base-path="resoleRoute(cur.path, 2)"></sub-menus>
    </div>
</template>
<script setup>
import { ref, defineProps } from "vue";
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from "@element-plus/icons-vue";
const props = defineProps(["item", "basePath"])
const count = ref(0)
const hasChildren = (children = []) => {
    return children ? !children.length : true
}
// setTimeout(() => {
//     count.value++
// }, 2000);
const resoleRoute = (path, index) => {
    console.log(path, index,"loop");
    return path
}
</script>
<script>
export default {
    name: "sub-menus"
}
</script>