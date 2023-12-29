<template>
  <div class="hello" ref="wrapper">
    <h1>这是远程请求加载的.vue文件</h1>
    <div ref="imgWrapper" style="position: relative;width: 300px;height: 300px;">
      <img :src="src" alt="qrcode" ref="imgEl" style="width: 300px;height: 300px;object-fit:contain" />
    </div>
    <input @change="getImageFromLocal" type="file" accept="image/png" />
  </div>
</template>

<script>
// import { scan } from 'qr-scanner-wechat';
import { sum } from "./tool.js";
const resultMap = new Map();
export default {
  name: 'HelloWorld',
  data() {
    return {
      src: ""
    }
  },
  mounted() {
    console.log(sum(1, 2));
    console.log(window.scan);
  },
  methods: {
    async getImageFromLocal(e) {
      const inputEl = e.target;
      if (!inputEl) return;
      if (!inputEl.files?.length) return;
      const image = inputEl.files[0];
      const url = URL.createObjectURL(image);
      this.src = url;
      // console.log(this.$refs.imgEl);
      // const result = await window.scan(this.$refs.imgEl);
      // console.log("result", result);
      const temCanvas = document.createElement("canvas");
      temCanvas.width = 300;
      temCanvas.height = 300;
      const ctx = temCanvas.getContext("2d", { willReadFrequently: true });
      if (!this.$refs.imgEl) return;
      this.$refs.imgEl.onload = async () => {
        if (!ctx) return;
        ctx.drawImage(this.$refs.imgEl, 0, 0, 300, 300);
        this.$refs.wrapper?.appendChild(temCanvas);
        ctx.fillStyle = "black";
        for (let i = 0; i < 5; i++) {
          const result = await window.scan(temCanvas);
          console.log("result", result);
          if (!result?.rect || !result.text) continue;
          resultMap.set(result.text, result.rect);
          const { x, y, height, width } = result.rect;
          ctx.fillRect(x, y, width, height);
        }
        this.draw();
      };
    },
    //多个二维码时添加动态小蓝点
    draw() {
      resultMap.forEach((rect, link) => {
        if (!this.$refs.imgWrapper) return;
        const dom = document.createElement("div");
        const { x, y, width, height } = rect;
        const _x = (x || 0) + width / 2 - 20;
        const _y = (y || 0) + height / 2 - 20;
        dom.className = "blue-chunk";
        dom.style.width = "40px";
        dom.style.height = "40px";
        dom.style.background = "#2ec1cc";
        dom.style.position = "absolute";
        dom.style.zIndex = "9999999";
        dom.style.top = _y + "px";
        dom.style.left = _x + "px";
        dom.style.color = "#fff";
        dom.style.textAlign = "center";
        dom.style.borderRadius = "100px";
        dom.style.borderBlockColor = "#fff";
        dom.style.borderColor = "unset";
        dom.style.borderRightStyle = "solid";
        dom.style.borderWidth = "3px";
        dom.style.animation = "scale-animation 2s infinite";
        dom.addEventListener("click", () => {
          console.log(link);
        });
        this.$refs.imgWrapper.appendChild(dom);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
