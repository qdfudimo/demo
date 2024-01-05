<template>
  <div class="card" ref="canvasRef">
    <div class="card-body">
      <h5 class="card-title">Canvas写入文字做背景水印</h5>
      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    </div>
  </div>
</template>


<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
const canvasRef = ref()
const defaultConfig = {
	rotate: -20,
	text: '',
	width: 100,
	height: 100,
	fillStyle: '#000',
	opacity: 0.005,
	font: `bold 16px serif`
}
const createWaterMark = ({ width, height, fillStyle, opacity, font, rotate, text }) => {
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = fillStyle;
	ctx.globalAlpha = opacity;
	ctx.font = font
	ctx.rotate(Math.PI / 180 * rotate);
	ctx.fillText(text, 0, 50);
	return canvas
}
// watermark 样式
let style = `
display: block;
overflow: hidden;
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
background-repeat: repeat;
pointer-events: none;`;
let globalWaterMark;
let Image;
let observer;
const setWaterMark = (Image, el) => {
  const waterMark = globalWaterMark || (globalWaterMark = document.createElement("div"));
  waterMark.className = `water-mark`; // 方便自定义展示结果
  style = `${style}background-image: url(${Image});`;
  waterMark.setAttribute("style", style);
  waterMark.classList.add('class-name');
  const defaultStyle = document.createElement('style');
  defaultStyle.innerHTML = `.class-name {
    color:red;
  }`;
  document.head.appendChild(defaultStyle);
  el.appendChild(waterMark)
}
// 监听 DOM 变化
const createObserver = (el) => {
  const waterMarkEl = el.parentElement.querySelector(".water-mark");
  observer = new MutationObserver((mutationsList) => {
    console.log(mutationsList);
    if (mutationsList.length) {
      const { removedNodes,type,target } = mutationsList[0];
      const currStyle = waterMarkEl.getAttribute("style");
      // 证明被删除了
      if (removedNodes[0] === waterMarkEl) {
        observer.disconnect();
        init(el);
      } else if (
        type === "attributes" &&
        target === waterMarkEl &&
        currStyle !== style
      ) {
        console.log(mutationsList[0]);
        waterMarkEl.setAttribute("style", style);
      }
    }
  });

  observer.observe(el.parentElement, {
    childList: true,
    attributes: true,
    attributeOldValue: true,
    subtree: true,
  });
};
const init = (el) => {
  Image = Image || createWaterMark({
    ...defaultConfig,
    opacity: 0.2,
    text: "前端好同学"
  }).toDataURL()
  setWaterMark(Image, el)
  createObserver(el)
}
onMounted(() => {
  init(canvasRef.value)
});
onBeforeUnmount(() => {
  observer.disconnect();
  observer = null
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  position: relative;
  min-height: 300px;
}
</style>
