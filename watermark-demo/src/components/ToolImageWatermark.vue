<template>
  <div class="card">
    <div class="card-header">
      <h5 class="card-title text">
        使用第三方包(@pansy/watermark)
      </h5>
      <div class="btns">
        <button type="button"
                class="btn btn-link"
                @click="handleShow">显示</button>
        <button type="button"
                class="btn btn-link"
                @click="handleHide">隐藏</button>
      </div>
    </div>
    <Watermark :options="options"
               :visible="visible">
      <div class="card-body">

        <p class="card-text">
          <img src="../assets/image.png"
               class="img-fluid">
        </p>
      </div>
    </Watermark>
  </div>
</template>

<script setup>
import { Watermark } from '@pansy/vue-watermark';
import { ref, reactive } from "vue"
const visible = ref(true);
const options = reactive({
  text: '前端小书童',
});

const handleShow = () => {
  visible.value = true;
};

const handleHide = () => {
  visible.value = false;
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.card-header {
  display: flex;
  align-items: center;

  .text {
    flex: 1;
  }
}
</style>
