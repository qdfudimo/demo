const requestQueue = []; // 请求队列
const maxConcurrent = 3; // 最大并发请求数
let concurrentRequests = 0; // 当前并发请求数
//请求拦截设置
import axios from "axios";
axios.interceptors.request.use(
    (config) => {
      console.log(config,'concurrentRequests')
        if (concurrentRequests < maxConcurrent) {
            console.log('000000')
            // 如果并发请求数量小于最大并发数，直接发送请求
            concurrentRequests++;
            return config;
        } else {
            // 如果并发请求数量达到最大并发数，将请求添加到队列中
            return new Promise((resolve) => {
                console.log('333333')
                requestQueue.push({
                    config,
                    resolve,
                });
            });
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);
//响应拦截
axios.interceptors.response.use(
    (response) => {
        concurrentRequests--; // 并发请求数量减2
        if (requestQueue.length > 0) {
            // 如果请求队列中有等待的请求，发送下一个请求
            const { config, resolve } = requestQueue.shift();
            concurrentRequests++;
            resolve(config);
        }
        return response.data;
    },
    (error) => {
        concurrentRequests--; // 并发请求数量减一
        return Promise.reject(error);
    }
);
// 发送请求
for (let i = 0; i < 10; i++) {
    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        // 处理响应
        console.log(response.data);
      })
      .catch((error) => {
        // 处理错误
        console.error(error);
      });
  }
//   https://juejin.cn/post/7249382407245348919