<template>
  <el-dialog
    v-model="dialogVisible"
    width="800px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @open="onOpen"
    @close="onClose"
  >
    <div class="detail-container">
      <div
        class="query-form-detail"
        id="query-form-detail"
        :style="{ width: pageWidth + 'px', height: pageHeight + 'px' }"
      >
        <div class="title">2110平台数据查询申请表</div>
        <div>查询事由：南宁局重点人员信息核查</div>
      </div>
      <div class="form-btn-group">
        <div class="btn plain" @click="download">下载</div>
        <div class="btn primary" @click="print">打印</div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
  visible: Boolean,
});
let dialogVisible = ref(false);
const A4_WIDTH = 210; // A4 纸的宽度（毫米）
const A4_HEIGHT = 297; // A4 纸的高度（毫米）
const SCALE = 3.77; // 缩放因子，可以根据需要调整

const pageWidth = ref(A4_WIDTH * SCALE);
const pageHeight = ref(A4_HEIGHT * SCALE);

let emit = defineEmits(['update:visible']);
watch(
  () => props.visible,
  newVal => {
    dialogVisible.value = newVal;
  }
);

watch(dialogVisible, newVal => {
  emit('update:visible', newVal);
});

const onClose = () => {
  dialogVisible.value = false;
};

const download = () => {
  var printableElement = document.getElementById('query-form-detail');
  html2pdf(printableElement);
};

const print = () => {
  // 获取要打印的部分的 HTML 元素
  var printableElement = document.getElementById('query-form-detail');
  // var element = document.getElementById('element-to-print');
  // 创建一个隐藏的 iframe 元素
  var iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  // 将要打印的部分的 HTML 内容复制到 iframe 中
  var iframeDocument = iframe.contentDocument;

  iframeDocument.open();
  iframeDocument.write(printableElement.innerHTML);
  iframeDocument.close();

  // 设置 iframe 的样式为可见
  iframe.style.display = 'block';

  // 等待一段时间后触发打印操作
  setTimeout(function () {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    document.body.removeChild(iframe);
  }, 1000); // 延迟时间可以根据需要进行调整
  // // 监听打印事件
  // // // 取消打印事件监听
  // window.removeEventListener('beforeprint', () => {
  //   console.log('取消打印...');
  // });

  // // 等待 iframe 加载完成后触发打印
  // iframe.onload = function () {
  //   iframe.contentWindow.print();
  //   document.body.removeChild(iframe);
  // };
};
</script>

<style lang="less">
.detail-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.query-form-detail {
  border: 1px solid #f1f1f1;
  .title {
    width: 100%;
    font-size: 24px;
    font-weight: 600;
    height: 60px;
    line-height: 60px;
    text-align: center;
    letter-spacing: 2px;
  }
}
</style>
<style lang="less">
// 打印样式
@media print {
  #query-form-detail {
    width: 210mm !important;
    height: 297mm !important;
    margin: 0 !important;
    padding: 0 !important;
  }
}
</style>
