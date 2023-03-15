<template>
  <div class="card"
       ref="canvasRef">
    <div class="card-body">
      <h5 class="card-title">Canvas写入文字做背景水印</h5>
      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import { defaultConfig } from "../constant/index"
import { createWaterMark } from "../utils/index"
const canvasRef = ref()

onMounted(() => {
  const Image = createWaterMark({
    ...defaultConfig,
    opacity: 0.2,
    text: "前端小书童"
  }).toDataURL()
  canvasRef.value.style.backgroundImage = `url(${Image})`
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
