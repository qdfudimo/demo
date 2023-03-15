<template>
  <div class="container text-center">
    <div class="row g-2">
      <div class="col-6">
        <ImagesWatermark />
      </div>
      <div class="col-6">
        <DivWatermark />
      </div>
      <div class="col-6">
        <CanvasImagesWatermark />
      </div>
      <div class="col-6">
        <CanvasTextWatermark />
      </div>
      <div class="col-6">
        <SvgWatermark />
      </div>
      <div class="col-6">
        <ShadowWatermark />
      </div>
      <div class="col-6">
        <BlindWatermark />
      </div>
      <div class="col-6">
        <ImageBlindWatermark />
      </div>
      <div class="col-6">
        <ToolImageWatermark />
      </div>
    </div>
  </div>
</template>

<script setup>
import ImagesWatermark from './components/ImagesWatermark.vue'
import ToolImageWatermark from './components/ToolImageWatermark.vue'
import BlindWatermark from './components/BlindWatermark.vue'
import CanvasImagesWatermark from './components/CanvasImagesWatermark.vue'
import CanvasTextWatermark from './components/CanvasTextWatermark.vue'
import DivWatermark from './components/DivWatermark.vue'
import ImageBlindWatermark from './components/ImageBlindWatermark.vue'
import ShadowWatermark from './components/ShadowWatermark.vue'
import SvgWatermark from './components/SvgWatermark.vue'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
