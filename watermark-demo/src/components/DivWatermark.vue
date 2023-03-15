<template>
  <div class="card"
       ref="divRef">
    <div class="card-body">
      <h5 class="card-title">div作为水印节点</h5>
      <p class="card-text">根据容器大小动态生产dom节点来作为使用内容，借助css的userSelect来阻止用户选中文本。（不建议使用此方案）</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const divRef = ref()
const addDivWaterMark = (el, text) => {
  const { clientWidth, clientHeight } = el;
  const waterWrapper = document.createElement('div');
  waterWrapper.className = "waterWrapper";
  const column = Math.ceil(clientWidth / 100);
  const rows = Math.ceil(clientHeight / 100);
  // 根据容器宽高动态生成div
  for (let i = 0; i < column * rows; i++) {
    const wrap = document.createElement('div');
    wrap.className = "water";
    wrap.innerHTML = `<div class="water-item">${text}</div>`
    waterWrapper.appendChild(wrap)
  }
  el.append(waterWrapper)
}
onMounted(() => {
  addDivWaterMark(divRef.value, "前端小书童")
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.card {
  position: relative;
  overflow: hidden;
  background-color: transparent;

  .waterWrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;

    .water {
      position: relative;
      height: 100px;
      flex: 0 0 100px;
      width: 100px;

      .water-item {
        position: absolute;
        font-size: 16px;
        opacity: .3;
        top: 10px;
        left: 10px;
        transform: rotate(-20deg);
        user-select: none;
        white-space: nowrap;
      }
    }
  }
}
</style>
