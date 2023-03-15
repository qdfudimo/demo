<template>
  <div class="card svg-mark"
       ref="svgRef">
    <div class="card-body">
      <h5 class="card-title">Svg做水印</h5>
      <p class="card-text">通过svg样式来控制水印样式，再将svg转换成base64的背景图</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const svgRef = ref()
// 将svg转换成base64的背景图
const createWaterMark = () => {
  const svgStr =
    `<svg xmlns="http://www.w3.org/2000/svg" width="180px" height="100px">
      <text x="0px" y="30px" dy="16px"
      text-anchor="start"
      stroke="#000"
      stroke-opacity="0.1"
      fill="none"
      transform="rotate(-20)"
      font-weight="100"
      font-size="16"
      >
      	前端小书童
      </text>
    </svg>`;
  return `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgStr)))}`;
}
onMounted(() => {
  svgRef.value.style.backgroundImage = `url(${createWaterMark()})`
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
