<template>
    <div>
        <div class="fontSty2">{{ content }}</div>
        <div class="a">{{ msg }}</div>
        <el-button type='success' size='mini'>按钮</el-button>
        <i class="el-icon-edit"></i>
    </div>
</template>
<script>
export default {
    props: ['content'],
    data() {
        return {
            msg: '我是unit04组件'
        }
    }
}
</script>
<style scoped>
@import "css/index.css";
.a {
    color: blue;
}
</style>
