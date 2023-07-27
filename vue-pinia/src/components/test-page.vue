<template>
  <hr class="my-4" />
    <div class="demo-pagination-block">
      <slot>22</slot>
      <div class="demonstration" @click="handelClick">Totalhandel item count</div>
      <el-pagination
        :current-page="currentPage.currentPage"
        :page-size="currentPage.pageSize"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, prev, pager, next"
        :total="currentPage.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
</template>
<script setup name="page">
import { ref } from 'vue'
import usePage from "../hooks/usePage"
const currentPage1 = ref(5)
const small = ref(false)
const background = ref(true)
const disabled = ref(false)
const api = ()=>{
    return new Promise((resolve, reject) => {
        resolve("在了")
    })
}
const {currentPage,handleCurrentChange,handleSizeChange} = usePage(api)
const handelClick = (val) => {
    ++currentPage1.value
}
</script>

<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>