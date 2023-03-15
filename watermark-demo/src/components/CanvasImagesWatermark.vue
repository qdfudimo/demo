<template>
  <div class="card"
       ref="canvasRef">
    <div class="card-body">
      <h5 class="card-title">Canvas写入图片做背景水印</h5>
      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import ImageBg from "../assets/watermark.png"
const canvasRef = ref()
const config = {
  width: 100,
  height: 100,
}
// 创建画布
const createWaterMark = ({ width, height }) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return {
    canvas,
    ctx: canvas.getContext('2d')
  };
}
onMounted(() => {
  const img = new Image();
  const { ctx, canvas } = createWaterMark(config);
  img.onload = function () {
    ctx.globalAlpha = 0.2;
    ctx.rotate(Math.PI / 180 * 20);
    ctx.drawImage(img, 0, 16, 180, 100);
    canvasRef.value.style.backgroundImage = `url(${canvas.toDataURL()})`
  };
  img.src = ImageBg;
});

</script>

<style scoped></style>
