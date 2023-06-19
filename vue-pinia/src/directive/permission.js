import { reactive ,ref,watchEffect} from "vue";
const codeList = reactive([1, 2, 3])
const hasPermission = (value) => {
    return codeList.includes(value)
}
const removeEl = (el) => {
    // 在绑定元素上存储父级元素
    el._parentNode = el.parentNode
    // 在绑定元素上存储一个注释节点
    el._placeholderNode = document.createComment("auth")
    // 使用注释节点来占位
    el.parentNode?.replaceChild(el._placeholderNode, el)
  }
  
  const addEl = (el) => {
    // 替换掉给自己占位的注释节点
    el._parentNode?.replaceChild(el, el._placeholderNode)
  }
const vAuth = {
    mounted: (el, binding) => {
      const value = binding.value
      if (!value) return
      if (!hasPermission(value)) {
        // 挂载的时候没有权限把元素删除
        removeEl(el)
      }
    },
    updated(el, binding) {
      console.dir(el);
      console.log("更新了");
      let update = () => {
        let valueNotChange = binding.value == binding.oldValue
        let oldHasPermission = hasPermission(binding.oldValue)
        let newHasPermission = hasPermission(binding.value)
        let permissionNotChange = oldHasPermission === newHasPermission
        if (valueNotChange && permissionNotChange) return
        if (newHasPermission) {
          addEl(el)
        } else {
          removeEl(el)
        }
      };
      if (el._watchEffect) {
        update()
      } else {
        el._watchEffect = watchEffect(() => {
          update()
        })
      }
    },
    beforeUnmount(el, binding, vnode, prevVnode) {
      console.log("卸载了");
    },
  }
  export default vAuth