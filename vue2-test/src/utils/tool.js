/**
 * 
 * @param {*代码} code 
 * @param {*默认值} value 
 * @param {*scoped变量 上下文变量，类似全局变量} params 
 * @returns 返回的是一个执行后的函数
 */
export function stingToCode(code, value, params) {
    const result = {
        value,
        error: null
    }
    try {
        result.value = new Function("content", `return ${code}`)(params) || value
    } catch (error) {
        console.log(error);
        result.error = error
    }
    return result
}
/**
 * 执行一段字符串格式的函数
 * @param {*} code 字符串函数代码
 * @param {*} params 
 * @param {*} globalParams 
 */
export function runFnInVm(code, params, globalParams) {
    const NOOP = args => args;
    const result = stingToCode(code, NOOP, globalParams);
    const fn = result.value;
    result.value = params;
    if (result.error) {
        return result
    }
    if (typeof fn != "function") {
        console.error("非法的js脚本", fn)
        result.error = new Error("非法的js脚本")
        return result
    }
    try {
        result.value = fn.call(fn, params);
    } catch (error) {
        console.error("js脚本执行错误", error)
        result.error = error
    }
    return result
}