<template>
  <div class="card">
    <div class="card-header">
      <div class="text">图片加盲水印</div>
      <div class="btns">
        <div class="form-check form-check-inline"
             v-for="item in colors"
             @click="colorKey = item.value"
             :key="item.value">
          <input class="form-check-input"
                 type="radio"
                 :checked="colorKey === item.value"
                 :value="item.value">
          <label class="form-check-label"
                 for="inlineRadio1">{{ item.label }}</label>
        </div>
        <select class="form-select"
                @change="$event => otherColorValue = $event.target.value">
          <option :selected="otherColorValue === item.value"
                  v-for="item in otherColors"
                  :key="item.label">{{ item.label }}</option>
        </select>
        <div class="form-check form-switch">
          <input class="form-check-input"
                 type="checkbox"
                 @click="flag = !flag"
                 :checked="flag"
                 role="switch">
        </div>
        <button type="button"
                @click="decodeBlind(status)"
                class="btn btn-link">
          {{ status ? "恢复" : "解码" }}
        </button>
      </div>
    </div>
    <div class="card-body">
      <canvas ref="canvasContent"></canvas>
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref, watch } from 'vue';
import assetImage from "../assets/image.png";
import { defaultConfig, colors, otherColors } from "../constant/index"
import { decode, encode, aspectFit } from "../utils/index"

const flag = ref(false)
const canvasContent = ref()
const status = ref(false)
const colorKey = ref(0)
const otherColorValue = ref()

// 创建画布写入内容
const createWaterMark = (canvas, { fillStyle, opacity, font, text, img }) => {
  let originalData, textData;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = fillStyle;
  ctx.globalAlpha = opacity;
  ctx.font = font
  ctx.fillText(text, 100, 100);
  textData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height).data;
  if (img) {
    const newImg = new Image();
    newImg.onload = function () {
      // 获取指定区域的canvas像素信息
      const [dx, dy, dw, dh] = aspectFit(newImg.width, newImg.height, ctx.canvas.width, ctx.canvas.height)
      ctx.drawImage(newImg, dx, dy, dw, dh);
      originalData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
      encode(ctx, textData, colorKey.value, originalData)
    };
    newImg.src = img;
  }
}

onMounted(() => {
  createWaterMark(canvasContent.value, {
    ...defaultConfig,
    opacity: 1,
    text: "前端小书童",
    img: assetImage
  })
});

const decodeBlind = async (tag) => {
  status.value = !tag
  if (tag) {
    // 恢复
    createWaterMark(canvasContent.value, {
      ...defaultConfig,
      opacity: 1,
      text: "前端小书童",
      img: assetImage
    })
  } else {
    // 解码
    decode(
      canvasContent.value,
      colorKey.value,
      flag.value,
      otherColorValue.value
    )
  }
}



watch([otherColorValue, colorKey, flag], () => {
  decodeBlind(true)
});

</script>

<style lang="less" scoped>
.card-header {
  display: flex;
  align-items: center;

  .form-switch {
    display: inline-flex;
    height: 100%;
    width: 80px;
    align-items: center;
    justify-content: center;
  }

  .form-select {
    display: inline-block;
    width: 100px;
  }

  .text {
    flex: 1;
  }
}

.card-body {
  padding: 0;
  min-height: 245px;

  canvas {
    width: 100%;
    height: 245px;
  }
}
</style>

