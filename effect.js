const dep = new Set([])
let activeEffect;

function doWatch(source) {
    const getter = () => {
        source()
        dep.add(activeEffect)
    };
    const effect = new ReactiveEffect(getter);
    // 这里执行的就是 getter
    effect.run();
}
class ReactiveEffect {
    constructor(fn) {
        this.fn = fn
    }
    run() {
        activeEffect = 22;
        const result = this.fn();
        // 重置
        activeEffect = null;
        return result;
    }
}
let source = async() => {
    let res = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("解决了")
        }, 1000);
    })
    console.log(res, "res", activeEffect, "activeEffect");
}
doWatch(source)
console.log(dep, activeEffect);
// const effect = new ReactiveEffect(() => console.log(2222))
//     // effect.run()
// console.log(effect.active);