<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">背景图片水印</h5>
      <p class="card-text">使用background-image，设置背景图平铺，如果需要选择，可以借用伪元素实现（将背景图设置到伪元素上，伪元素旋转）。</p>
    </div>
  </div>
</template>

<script>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.card {
  position: relative;
  overflow: hidden;
  background-color: transparent;

  &::before {
    content: "";
    position: absolute;
    width: 120%;
    height: 120%;
    top: -20%;
    left: -20%;
    z-index: -1;
    background-image: url("../assets/watermark.png");
    background-position: 0 0;
    background-origin: content-box;
    background-attachment: scroll;
    transform: rotate(20deg);
    background-size: 120px;
    background-repeat: round;
    opacity: .3;
    pointer-events: none;
  }
}
</style>
