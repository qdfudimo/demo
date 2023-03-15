## 记一次水印需求，重新认识下网页水印

### 使用背景图图片

单独使用 css 实现，使用 backgroundImage，backgroundRepeat 将背景图片平铺到需要加水印的容器中即可。
如果希望实现旋转效果，可以借助伪元素，将背景样式放到伪元素中，旋转伪元素实现：

```html
<style>
 .watermark {
  position: relative;
  overflow: hidden;
  background-color: transparent;
 }
 .watermark::before {
  content: '';
  position: absolute;
  width: 160%;
  height: 160%;
  top: -20%;
  left: -20%;
  z-index: -1;
  background-image: url('./watermark.png');
  background-position: 0 0;
  background-origin: content-box;
  background-attachment: scroll;
  transform: rotate(-20deg);
  background-size: auto;
  background-repeat: round;
  opacity: 0.3;
  pointer-events: none;
 }
</style>
```

### 动态生成div

根据水印容器的大小动态生成div，div内可以任意设置文本样式和图片，借助userSelect禁止用户选中文本水印；

```js
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
```

### Canvas写入图片做背景水印

将图片写入Canvas然后将Canvas作为背景图

```js
  const img = new Image();
  const { ctx, canvas } = createWaterMark(config);
  img.onload = function () {
    ctx.globalAlpha = 0.2;
    ctx.rotate(Math.PI / 180 * 20);
    ctx.drawImage(img, 0, 16, 180, 100);
    canvasRef.value.style.backgroundImage = `url(${canvas.toDataURL()})`
  };
  img.src = ImageBg;
```

### Canvas写入文字做背景水印

将文字写入Canvas然后将Canvas作为背景图

```js
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
```

### Svg做水印

通过svg样式来控制水印样式，再将svg转换成base64的背景图

```js
  const svgStr =
    `<svg xmlns="http://www.w3.org/2000/svg" width="180px" height="100px">
      <text x="0px" y="30px" dy="16px"
      text-anchor="start"
      stroke="#000"
      stroke-opacity="0.1"
      fill="none"
      transform="rotate(-20)"
      font-weight="100"
      font-size="16"> 前端小书童</text>
    </svg>`;
  return `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgStr)))}`;
```

### shadowDom水印

使用customElements自定义个一个标签（可以使用其他任意标签，不过注意shadow DOM会使起同级的元素不显示。）
可以像shadow DOM写入style样式和水印节点（可以使用背景或者div形式）
shadow DOM内部实现的样式隔离不用担心写入的style影响页面其他元素样式，这个特性在微前端的实现中也被广泛使用。

```js
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
   const { clientWidth, clientHeight } = document.querySelector('.shadow-watermark')
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
```

### 盲水印

canvas画布(canvas.getContext('2d'))调用 getImageData 得到一个 ArrayBuffer，用于记录画布每个像素的 rgba 值

r: Red取值范围0~255
g: Green取值范围0~255
b：Blue取值范围0~255
a：Alpha 透明度取值范围0~1，0代表全透明
可以理解为每个像素都是通过红、绿、蓝三个颜色金额透明度来合成颜色

方案一：低透明度方案的暗水印

当把水印内容的透明度 opacity 设置很低时，视觉上基本无法看到水印内容，但是通过修改画布的 rgba 值，可以使水印内容显示出来。
选择固定的一个色值例如R，判断画布R值的奇偶，将其重置为0或者255，低透明的内容就便可以显示出来了。

```js
const decode = (canvas, colorKey, flag, otherColorValue) => {
 const ctx = canvas.getContext('2d');
 const originalData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
 let data = originalData.data;
 for (let i = 0; i < data.length; i++) {
  //筛选每个像素点的R值
  if (i % 4 == colorKey) {
   if (data[i] % 2 == 0) {
    //如果色值为偶数
    data[i] = flag ? 255 : 0;
   } else {
    //如果色值为奇数
    data[i] = flag ? 0 : 255;
   }
  } else if (i % 4 == 3) {
   //透明度不作处理
   continue;
  } else {
   // 关闭其他色值
   if (otherColorValue !== undefined) {
    data[i] = otherColorValue
   }
  }
 }
 ctx.putImageData(originalData, 0, 0);
}
```

方案二：将水印内容以像素偏差记录到画布中

用画布和水印后的画布绘制的像素进行ArrayBuffer对比，在存在水印像素的位置（水印画布透明度不为0）修改图片画布的奇偶，这样通过上面指定色值和奇偶去解码时，修改的文本像素就会被显示出来；

```js
const encode = (ctx, textData, color, originalData) => {
 for (let i = 0; i < originalData.data.length; i++) {
  // 只处理目标色值
  if (i % 4 == color) {
   // 水印画布透明度为0
   if (textData[i + offset] === 0 && (originalData.data[i] % 2 === 1)) {
    // 放置越界
    if (originalData.data[i] === 255) {
     originalData.data[i]--;
    } else {
     originalData.data[i]++;
    }
    // 水印画布透明度不为0
   } else if (textData[i + offset] !== 0 && (originalData.data[i] % 2 === 0)) {
    originalData.data[i]++;
   }
  }
 }
 ctx.putImageData(originalData, 0, 0);
}
```

方案三：数字加密

在图像信号的频域（变换域）中隐藏信息要比在空间域（上面得到的像素颜色的ArrayBuffer）中隐藏信息具有更好的防攻击性。
这部分暗水印的实现，可以直接使用[阿里云提供给的api](https://help.aliyun.com/document_detail/444165.html)，不过需要图片资源藏到的阿里云的OSS下；

### MutationObserver

可以发现上面水印基本都是通过增加节点或者背景图的形式来实现，那用户其实可以通过屏蔽样式或者删除Dom来消除水印，那么我们可以借用MutationObserver来监听下水印dom的变化，来阻止用户以这种形式来消除水印；

参考
<https://www.cnblogs.com/88223100/p/Exploring-Web-Watermarking-Technology.html>
<https://blog.csdn.net/blueblueskyhua/article/details/120346195>
<https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API>
