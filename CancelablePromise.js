/**取消重读请求 */
class CancelablePromise {
    constructor() {
        this.pendingPromise = null
        this.reject = null
    }

    request(requestFn) {
        if (this.pendingPromise) {
            // this.cancel('取消重复请求')
            return Promise.reject('取消重复请求')
        }

        const promise = new Promise((_, reject) => (this.reject = reject))
        this.pendingPromise = Promise.race([requestFn(), promise])
        return this.pendingPromise
    }

    cancel(reason) {
        this.reject(reason)
        this.pendingPromise = null
    }
}

function request(delay,i) {
    let timer;
    return () =>
        new Promise(resolve => {
            timer = setTimeout(() => {
                resolve('最后赢家是我' + i)
            }, delay)
        })
}
const cancelPromise = new CancelablePromise()

// 模拟频繁请求5次
for (let i = 0; i < 5; i++) {
    cancelPromise
        .request(request(i * 1000,i))
        .then((res) => console.log(res)) // 最后一个 最后赢家是我
        .catch((err) => console.error(err)); // 前四个 取消重复请求
}