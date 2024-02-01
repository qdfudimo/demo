<script>
import mockData from "../utils/index";
import { runFnInVm } from "../utils/tool";
export default {
    name: "customArea",
    data() {
        return {
            template: mockData.template,
            js: mockData.js,
            css: mockData.css,
        }
    },
    computed: {
        classNames() {
            const uid = Math.random().toString(36).slice(2)
            return `custom-area-${uid}`
        },
        scopedStyle() {
            if (this.css) {
                const scope = `.${this.classNames}`
                const regex = /(^|\}|,)\s*([^{|^,]+)/g
                //为class添加前缀
                return this.css.trim().replace(regex, (m, g1, g2) => {
                    return g1 ? `${g1} ${scope} ${g2}` : `${scope} ${g2}`
                })
            }
            return ""
        },
        component() {
            const js = (this.js || "").trim()
            const result = runFnInVm(js, {})
            const component = result.value
            if (result.error) {
                result.error = {
                    msg: result.error.toString(),
                    type: "js脚本错误"
                }
                result.value = { hasError: true }
                return result
            }
            const resultTemp = (this.template || "")
                .replace(/^ *< *template *>|<\/ *template *> *$/g, "").trim()
            if (resultTemp) {
                component.template = resultTemp
                component.render = undefined
            } else if (!component.render) {
                component.template = "<span>未提供模板或render函数</span>"
            }
            component.mixins = [{
                created() {
                    console.log("component初始化");
                }
            }]
            const computed = component.computed || {}
            component.props = ["outerData"]
            return result
        }
    },
    render() {
        const { error, value: component } = this.component;
        console.log(component);
        let errorDom;
        if (error) {
            errorDom = <div class="error-msg-wrapper">
                <div>{error.type}</div>
                <div>{error.msg}</div>
            </div>
        }
        return <div class="code-preview-code">
            <div class={this.classNames}>
                <style>{this.scopedStyle}</style>
                <component areaName="自定义的" outerData="635"></component>
            </div>
            {errorDom}
        </div>
    }
}
</script>
