<template>
  <div class="card">
    <div class="card-header">
      <div class="text">盲水印</div>
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
                @click="decodeBlind(baseIamges)"
                class="btn btn-link">
          {{ baseIamges ? "恢复" : "解码" }}
        </button>
      </div>
    </div>
    <div class="card-body"
         ref="canvasContent">
      <img v-if="baseIamges"
           :src="baseIamges"
           class="img-fluid">
      <p v-else
         class="card-text">
        低透明度盲水印，正常状态下无水印，当修改单个rgb色值时，低透明的水印文案将会显示出来。<br />
        可以通过上面配置:<br />
        1. 指定处理哪个色值（R、G、B）；<br />
        2. 其他色值是调整成最大值、最小值还是不修改；<br />
        3. 指定调整的色值可以选择基数值重置成最大还是偶数值重置成最大；<br />
      </p>
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref, watch } from 'vue';
import { defaultConfig, colors, otherColors } from "../constant/index"
import { createWaterMark, decode } from "../utils/index"
import html2canvas from 'html2canvas';
const flag = ref(false)
const canvasContent = ref()
const baseIamges = ref()
const colorKey = ref(0)
const otherColorValue = ref()
let ImageData;

onMounted(() => {
  ImageData = createWaterMark({
    ...defaultConfig,
    text: "前端小书童"
  }).toDataURL()
  canvasContent.value.style.backgroundImage = `url(${ImageData})`
});

// 解码
const decodeBlind = async (tag) => {
  if (tag) {
    // 恢复
    baseIamges.value = null;
  } else {
    const canvas = await html2canvas(canvasContent.value, {
      useCORS: true,
    });
    // 解码
    decode(
      canvas,
      colorKey.value,
      flag.value,
      otherColorValue.value
    );
    baseIamges.value = canvas.toDataURL()
  }
};


watch([otherColorValue, colorKey, flag], () => {
  baseIamges.value = null
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

  .card-text {
    padding: 10px;
  }
}
</style>

