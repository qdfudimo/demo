// 并发拦截
class ConcurrentInterceptors {
    constructor(maxProgressCount) {
        // 最大并发数量
        this.maxProgressCount = maxProgressCount;
        // 进行中的任务数量
        this.inProgressCount = 0;
        // 等待中的任务
        this.waitingArr = [];
    }

    /**
     * 拦截器
     * @return Promise.resolve()
     */
    interceptors = () => {
        return new Promise(resolve => {
            const {
                maxProgressCount,
                inProgressCount
            } = this
            // 非数字、isNaN、不大于0 不拦截
            if (typeof maxProgressCount !== 'number' || isNaN(maxProgressCount) || maxProgressCount <= 0) {
                resolve()
                return
            }
            // 当前进行的任务数量是否大于最大并发数量
            if (inProgressCount < maxProgressCount) {
                // 未超出数量
                this.inProgressCount += 1
                resolve()
            } else {
                // 超出数量
                this.waitingArr.push(resolve);
            }
        });
    }

    /**
     * 启动下一个被拦截的任务
     */
    next = () => {
        // 当前进行中的数量减一
        this.inProgressCount -= 1

        // 等待发送的请求的移除一个
        const nextResolve = this.waitingArr.shift();
        if (nextResolve) {
            // 要进行下一个任务了 当前进行中的数量加一
            this.inProgressCount += 1
            nextResolve();
        }
    }

    /**
     * 更新最大并发数量
     * @param newMaxProgressCount
     */
    upMaxProgressCount = (newMaxProgressCount) => {
        this.maxProgressCount = newMaxProgressCount;
    }
}

export default ConcurrentInterceptors

import axios from 'axios';
// 引入并发拦截器
import ConcurrentInterceptors from './concurrentInterceptors';
// 创建并发实例对象,并设置最大并发数量:2
const concurrent = new ConcurrentInterceptors(2)

// 创建axios实例对象
const instance = axios.create({});

// axios自身的请求拦截器
instance.interceptors.request.use(
    async config => {
            /**
             * 关键代码 
             * @description 并发拦截器启动 进行数量检测
             */
            await concurrent.interceptors()

            return config;
        },
        error => Promise.reject(error)
);

// axios自身的响应拦截器
instance.interceptors.response.use(
    response => {
        /**
         * 关键代码 
         * @description 通知并发拦截器有任务完成了 请放行下一个任务!
         */
        concurrent.next()

        return response;
    },
    error => {
        /**
         * 关键代码 
         * @description 通知并发拦截器有任务完成了 请放行下一个任务!
         */
        concurrent.next()

        return Promise.reject(error);
    }
);
/**
 * 同时请求多次之请求第一次，别的以第一次结果为准
 */
let cacheResult = new Map()

function cacheRequest(methods, url, params) {
    //生成参数加url的唯一值
    let str = getUnicode(params, url);
    let current = cacheResult.get(str)
    if (current) {
        return new Promise((resolve, reject) => {
            if (current.type == "pendding") {
                current.resolves.push(resolve)
                current.rejects.push(reject)
            } else if (current.type == "resolve") {
                //为了防止元数据污染
                resolve(cloneDeep(current.data))
            } else {
                reject(cloneDeep(current.data))
            }
        })
    } else {
        current = {
            type: "pendding",
            resolves: [],
            rejects: []
        }
        cacheResult.set(str, current);
        let args = [url];
        methods = methods.toLowerCase()
        if (methods == "post" && params) {
            args.push(params)
        }
        return axios[methods](url, params).then(res => {
            if (current.resolves && current.resolves.length) {
                current.resolves.forEach(item => {
                    item(cloneDeep(e))
                });
                current.resolves = null
                current.rejects = null
            }
            current.type = "resolve"
            current.data = cloneDeep(e)
            cacheResult.set(str, current);
            return Promise.resolve(cloneDeep(e))
        }).catch(e => {
            if (current.rejects && current.rejects.length) {
                current.rejects.forEach(item => {
                    item(cloneDeep(e))
                });
                current.resolves = null
                current.rejects = null
            }
            current.type = "reject"
            current.data = cloneDeep(e)
            cacheResult.set(str, current);
            return Promise.reject(cloneDeep(e))
        })
    }
}