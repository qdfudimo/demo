<template>
  <div class="tag-container" ref="containerRef">
    <template v-for="(i, index) in tagList">
      <div
        class="tag"
        :style="{ ...tagStyle }"
        :key="index"
        v-if="(overHiddenIndex && index < overHiddenIndex) || !overHiddenIndex"
      >
        {{ i }}
      </div>
    </template>
    <el-popover
      placement="top-start"
      title=""
      :width="tagList.length - overHiddenIndex > 4 ? 500 : 300"
      trigger="hover"
    >
      <template #reference>
        <div class="ellipsis" v-if="showOverHiddenBtn" :style="{ ...tagStyle }">...</div>
      </template>
      <template v-for="(i, index) in tagList">
        <div class="tag" :style="{ ...tagStyle }" :key="index" v-if="index >= overHiddenIndex">
          {{ i }}
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
const props = defineProps({
  tagStyle: {
    type: Object,
    default: () => {},
  },
  tagList: {
    type: Array,
    default: () => [
      'Nam Nin Long',
      'P2 Long',
      'TC A Long',
      'Nam Nin Long',
      'P2 Long',
      'TC A Long',
      'Nam Nin Long',
      'P2 Long',
      'TC A Long',
      'Nam Nin Long',
      'P2 Long',
      'TC A Long',
      'Nam Nin Long',
      'P2 Long',
      'TC A Long',
      'Nam Nin Long',
      'P2 Long',
      'TC A Long',
    ],
  },
});
let containerRef = ref(null);
let overHiddenIndex = ref(0);
let showOverHiddenBtn = ref(false);
let observer = null;
onMounted(() => {
  calcIndex();
  setTimeout(() => {
    observerEl();
  }, 0);
});

onBeforeMount(() => {
  let element = containerRef.value;
  element && observer.unobserve(element);
});

const calcIndex = () => {
  if (!props.tagList || props.tagList.length === 0) {
    return;
  }
  let containers = document.querySelectorAll('.tag-temp-container');
  if (containers && containers.length) {
    containers.forEach(item => {
      item.remove();
    });
  }
  // 创建一个虚拟的容器
  let container = document.createElement('div');
  container.setAttribute('class', 'tag-temp-container');
  //   container.style.width = containerRef.value.clientWidth + 'px';
  //   给容器设置overflow:auto 使元素超出后可以滚动
  container.setAttribute(
    'style',
    `width:${
      containerRef.value.clientWidth + 'px'
    };display:flex;flex-wrap:wrap; overflow:auto;position:fixed;top:0;left:0;z-index:99`
  );
  let tagStyleStr = '';
  for (let key in props.tagStyle) {
    tagStyleStr += `${key}:${props.tagStyle[key]};`;
  }
  //   创建标签
  for (let i = 0; i < props.tagList.length; i++) {
    let tag = document.createElement('div');
    tag.setAttribute('class', 'tag');
    tag.setAttribute('style', tagStyleStr);
    tag.innerHTML = props.tagList[i];
    container.appendChild(tag);
  }
  document.body.appendChild(container);
  let nodes = container.querySelectorAll('.tag');
  console.log('nodes', nodes);
  for (let i = 0; i < nodes.length; i++) {
    console.log('scrollTop', nodes[i], nodes[i].offsetTop);
    // 如果当前标签的offsetTop>0，则说明有溢出，则记录当前标签的下标，并跳出循环
    if (nodes[i].offsetTop > 0) {
      overHiddenIndex.value = i;
      break;
    }
  }

  if (overHiddenIndex.value === 0) {
    showOverHiddenBtn.value = false;
    return;
  }
  // 过滤出宽度未超出的标签
  let remainTags = props.tagList.filter((item, index) => index < overHiddenIndex.value);

  //   如果宽度未超出的标签等于所有标签，则说明没有溢出，则不显示省略号按钮
  if (remainTags.length === props.tagList.length) {
    showOverHiddenBtn.value = false;
    document.body.removeChild(container);
    return;
  }
  // 到这一步说明已经溢出了 则需要清空容器
  container.innerHTML = '';
  //   document.body.removeChild(container);
  remainTags.forEach(i => {
    let tag = document.createElement('div');
    tag.setAttribute('class', 'tag');
    tag.setAttribute('style', tagStyleStr);
    tag.innerHTML = i;
    container.appendChild(tag);
  });
  let ellipsis = document.createElement('div');
  ellipsis.setAttribute('style', tagStyleStr);
  ellipsis.innerText = '...';
  container.appendChild(ellipsis);

  //   如果省略号的offsetTop大于0，则说明有溢出，则需要再往前取一个标签
  if (ellipsis.offsetTop > 0) {
    overHiddenIndex.value = overHiddenIndex.value - 1;
  }

  showOverHiddenBtn.value = true;
  document.body.removeChild(container);
  //   清除容器 这次加上溢出省略号的元素
  console.log('containerRef', overHiddenIndex.value);
};

const observerEl = () => {
  let element = containerRef.value;
  element && observer && observer.unobserve(element);
  observer = new ResizeObserver(entries => {
    for (let entry of entries) {
      const width = entry.contentRect.width;
      calcIndex();
      // 在这里执行宽度变化后的操作
    }
  });

  observer.observe(element);
};
</script>

<style lang="scss" scoped>
.tag-container {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  .ellipsis {
    cursor: pointer;
  }
}
</style>