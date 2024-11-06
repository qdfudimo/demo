<template>
    <div style="position: relative;" class="at-container" @focusout="inputBlur">
        <div
            ref="atInputRef"
            :class="_class"
            :style="{
                '--at-input-height': height
            }"
            :contenteditable="!disabled"
            spellcheck="false"
            @input="inputChange"
            @click="inputClick"
            @keydown="inputKeydown"
        >
            <template v-html="inputValue"></template>
        </div>
        <div
            ref="popoverRef"
            v-if="popoverIsShow"
            class="at-popover"
            key="popover"
            tabindex="0"
            :style="{
                top: popoverPosition.top + 'px',
                left: popoverPosition.left + 'px'
            }"
        >
            <div class="loading-tip" v-if="isQuerying">
                加载中...
            </div>
            <ul
                v-else
                class="at-popover-list"
            >
                <li
                    v-for="(item, index) in options"
                    class="at-popover-item"
                    :class="{ 'active': currentFocusOptionIndex === index }"
                    ref="popoverItemRef"
                    :key="item.label"
                    @mousedown="beforeSelect"
                    @click="onSelect(item)"
                >
                    {{  item.label  }}
                </li>
                <li
                    v-if="!options.length"
                    class="empty"
                >
                    暂无数据
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
const props = defineProps({
    queryOptions: {
        type: Function,
        required: true
    },
    customClass: {
        type: Object,
        default:() => ({})
    },
    placeholder: {
        type: String,
        default: ''
    },
    error: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    atColor: {
        type: String,
        default: '#1890ff'
    },
    height: {
        type: String,
        default: '80px'
    },
    wrap: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(["atChange"]);

const atInputRef = ref();
const popoverItemRef = ref();
// 输入框内容
const inputValue = ref('');
// @索引
const currentAtIdx = ref(0);
const preffix = ref('');
const suffix = ref('');
const options = ref([]);

let timer = null;
let isQuerying = ref(false);
function setOptions(key) {
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    isQuerying.value = true;
    timer = setTimeout(async () => {
        const _options = await props.queryOptions(key);
        isQuerying.value = false;
        options.value = _options;
        currentFocusOptionIndex.value = 0;
    }, 500);
}

const popoverRef = ref();
const popoverIsShow = ref(false);
const popoverPosition = ref({ top: 0, left: 0 });
function inputChange (e) {
    const { innerText } = e.target ;
    inputValue.value = innerText;
    onObserveInput();
}

const onObserveInput = (fromSpanClick = false) => {
    let cursorBeforeStr = '';
    const selection = window.getSelection();
    if (selection?.focusNode?.data) {
        cursorBeforeStr = selection.focusNode?.data.slice(0, selection.focusOffset);
    }
    preffix.value = selection.focusNode;
    // 当前光标所在文本节点光标前的最后一个@所在位置
    const lastAtIndex = cursorBeforeStr?.lastIndexOf('@');
    currentAtIdx.value = lastAtIndex;
    if (lastAtIndex !== -1) {
        getCursorPosition();
        // 当前光标所在文本节点光标前的最后一个@至光标的文本,若是点击@标签执行的计算，则无视光标所在偏移值,默认搜索所有值
        const searchStr = fromSpanClick ? '' : cursorBeforeStr.slice(lastAtIndex + 1);
        if (!isIncludeSpacesOrLineBreak(searchStr)) {
            suffix.value = searchStr;
            setOptions(searchStr);
            popoverIsShow.value = true;
        } else {
            popoverIsShow.value = false;
            suffix.value = '';
        }
    } else {
        popoverIsShow.value = false;
    }
};

function inputClick (e) {
    if (props.disabled) return;
    // 判断当前标签名是否为span 是的话选中当做一个整体
    if (e.target.localName === 'span') {
        onObserveInput(true);
        selectAtSpanTag(e.target);
    } else {
        onObserveInput();
    }
}

const selectAtSpanTag = (target) => {
    window.getSelection()?.getRangeAt(0).selectNode(target);
};

const getCursorPosition = () => {
        // 坐标相对浏览器的坐标
        const { x, y } = window.getSelection()?.getRangeAt(0).getBoundingClientRect();
        // 获取编辑器的坐标
        const { x: eX, y: eY } = atInputRef.value?.getBoundingClientRect();
        // 光标所在位置
        popoverPosition.value = { left: x - eX, top: y - eY + 20 };
};

/**
 * @param name 标签名
 * @param color 回显颜色
 * @returns
 */
const createAtSpanTag = (option, color = props.atColor) => {
    const ele = document.createElement('span');
    ele.className = 'at-span';
    ele.style.color = color;
    ele.contentEditable = 'false';
    ele.innerText = `@${option.label}`;
    ele.tabIndex = getAtList().length + 1;
    ele.setAttribute('data-key', option.key.toString())
    return ele;
};

let previousActiveNode = null
/** 设置点击前选区所在的元素节点 */
const beforeSelect = (e) => {
    previousActiveNode = document.activeElement
}

/**
 * 选择时回调
 */
const onSelect = (option) => {
    const selection = window.getSelection();
    // 如果点击前选中了@标签，则将选区设置为该@标签，并替换；否则执行插入操作
    if (previousActiveNode?.classList.contains('at-span')) {
        selection?.removeAllRanges(); // 清空所有选择
        const range = document.createRange();     // 创建一个 Range 对象
        range.selectNode(previousActiveNode);                 // 设置 Range 包含的节点
        selection?.addRange(range);
        range.deleteContents();
        const atEle = createAtSpanTag(option);
        range.insertNode(atEle)
        range.collapse(false);
    } else {
        const range = selection?.getRangeAt(0);
        // 选中输入的 @关键字  -> @郑
        range.setStart(preffix.value, currentAtIdx.value);
        range.setEnd(preffix.value, currentAtIdx.value + 1 + suffix.value.length);
        // 删除输入的 @关键字
        range.deleteContents();
        // 创建元素节点
        const atEle = createAtSpanTag(option);
        // 插入元素节点
        range.insertNode(atEle);
        // 光标移动到末尾
        range.collapse(false);
    }
    // 选择用户后重新计算content
    inputValue.value = atInputRef.value?.innerText;
    // 关闭弹框
    popoverIsShow.value = false;
    // 输入框聚焦
    atInputRef.value.focus();
    options.value = [];
    emit('atChange', getAtList());
};

function isIncludeSpacesOrLineBreak (str) {
    return str.includes(" ") || str.includes("\n") || str.includes("\r");
}

// 失焦处理
function inputBlur (e) {
    if (e.relatedTarget && e.relatedTarget.classList.contains('at-popover')) return;
    popoverIsShow.value = false;
    options.value = [];
}

// 样式聚合
const _class = computed(() => {
    return [
        props.customClass,
        'at-input',
        { 'is-error': props.error },
        { 'is-disabled': props.disabled },
        { 'is-wrap': props.wrap }
    ];
})

// 按键控制
const currentFocusOptionIndex = ref(0);
function inputKeydown (e) {
    switch(e.key) {
        case 'Enter':
            if (popoverIsShow.value) {
                onSelect(options.value[currentFocusOptionIndex.value]);
                e.preventDefault();
                break;
            }
            !props.wrap && e.preventDefault();
            break;
        case 'ArrowUp':
            if (popoverIsShow.value) {
                currentFocusOptionIndex.value = +(currentFocusOptionIndex.value - 1 + options.value.length) % options.value.length
                e.preventDefault();
            }
            break;
        case 'ArrowDown':
            if (popoverIsShow.value) {
                currentFocusOptionIndex.value = +(currentFocusOptionIndex.value + 1) % options.value.length
                e.preventDefault();
            }
             break;
        case 'Backspace':
            const selection = window.getSelection();
            const range = selection?.getRangeAt(0);
            if (!range) {
                break;
            }
            // 若删除span标签，则光标所在节点的共有祖先节点应为at-input；若选中文本中包含span标签也如此。
            if (range.commonAncestorContainer?.classList?.contains('at-input')) {
                setTimeout(() => {
                    emit('atChange', getAtList());
                }, 0)
            }
    }
}

// 焦点控制
function setFocus () {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(atInputRef.value);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);
    atInputRef.value?.focus();
}

// 获取文本
function getText () {
    return atInputRef.value?.innerText;
}

// 获取@数组
function getAtList () {
    return Array.prototype.map.call((atInputRef.value?.querySelectorAll('.at-span')), (v) => {
        return {
            label: v.innerText.slice(1),
            key: v.getAttribute('data-key')
        }
    })
}

defineExpose({
    setFocus,
    getText,
    getAtList
})
</script>