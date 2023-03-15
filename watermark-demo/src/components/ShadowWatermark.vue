<template>
  <div class="card shadow-watermark"
       ref="shadowRef">
    <div class="card-body">
      <h5 class="card-title">shadowDom水印</h5>
      <p class="card-text">使用customElements自定义个一个标签（可以使用其他任意标签，不过注意shadow DOM会使起同级的元素不显示。）
        可以像shadow DOM写入style样式和水印节点（可以使用背景或者div形式）.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const shadowRef = ref()

class ShadowMark extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const wrapContainer = document.createElement('div')
    const style = document.createElement('style');
    style.textContent = `
			.wrapContainer {
				width: 100%;
				height: 100%;
				display: flex;
				flex-wrap: wrap;
        position: absolute;
        top: 0;
        left: 0;
			}
			.watermark-item {
				display: flex;
				font-size: 16px;
				opacity: .3;
				transform: rotate(-20deg);
				user-select: none;
				white-space: nowrap;
				justify-content: center;
				align-items: center;
			}`;
    const waterHeight = 100
    const waterWidth = 100
    // 此部分使用的div的形式，使用背景图和canvas都可以
    const [clientWidth, clientHeight] = arguments
    const column = Math.ceil(clientWidth / waterWidth)
    const rows = Math.ceil(clientHeight / waterHeight)
    wrapContainer.setAttribute('class', "wrapContainer")
    for (let i = 0; i < column * rows; i++) {
      const wrap = document.createElement('div')
      wrap.setAttribute('class', 'watermark-item')
      wrap.style.width = waterWidth + 'px'
      wrap.style.height = waterHeight + 'px'
      wrap.textContent = "前端小书童"
      wrapContainer.appendChild(wrap)
    }
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(wrapContainer)
  }
}
customElements.define('shadow-mark', ShadowMark);
onMounted(() => {
  const shadowDom = new ShadowMark(shadowRef.value.clientWidth, shadowRef.value.clientHeight)
  shadowRef.value.appendChild(shadowDom)
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.card {
  position: relative;
  overflow: hidden;
  background-color: transparent;

  .mark {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
