<template>
    <el-menu-item :index="resoleRoute(item.path, 1)" v-if="hasChildren(item.children)">
        <!-- <el-icon><icon-menu /></el-icon> -->
        <span>{{ item.meta.title }}</span>
    </el-menu-item>
    <el-sub-menu :index="resoleRoute(item.path, 2)" v-else>
        <template #title>
            <!-- <el-icon>
                <location />
            </el-icon> -->
            <span>{{ item.meta.title }}</span>
        </template>
        <sub-menu v-for="cur in item.children" :key="cur.path" :item="cur" :base-path="resoleRoute(cur.path, 3)"></sub-menu>
    </el-sub-menu>
</template>
<script>
import { defineComponent } from "vue";
// import {
//     Document,
//     Menu as IconMenu,
//     Location,
//     Setting,
// } from "@element-plus/icons-vue";
export default defineComponent({
    props: ["item", "basePath"],
    name: "sub-menu",
    setup(props) {
        const hasChildren = (children = []) => {
            return children ? !children.length : true
        }
        const resoleRoute = (path, index) => {
            console.log(path, index);
            return path
        }
        return {
            hasChildren, resoleRoute
        }
    }
})
</script>
<!-- <script setup>
import { ref, defineProps } from "vue";
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from "@element-plus/icons-vue";
defineProps(["item", "basePath"])
const hasChildren = (children = []) => {
    return children ? !children.length : true
}
const resoleRoute = (path, index) => {
    console.log(path, index);
    return path
}
</script> -->
<!-- <script>
export default {
    name: "sub-menu"
}
</script> -->