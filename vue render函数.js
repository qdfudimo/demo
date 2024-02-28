const code = ` const _Vue = Vue;
    return function render(_ctx, _cache) {
        console.log(_ctx, _cache)
        with(_ctx) {
            const {
                toDisplayString: _toDisplayString
            } = _Vue
            return _toDisplayString(str)
        }
    }
`
const Vue = {
    toDisplayString: (str) => {
        return str
    }
}
const proxyToUse = {
    str: "测试数据"
}
const render = new Function("Vue", code)(Vue)
console.log(render.call(proxyToUse,proxyToUse,"测试参数arguments"));