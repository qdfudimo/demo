//https://juejin.cn/post/7075348765162340383
import axios from "axios";
import Store from "@/store";
import Router from "@/router";
import {
    Message
} from "element-ui";
import UserUtil from "@/utils/user";

// 创建实例
const Instance = axios.create();
Instance.defaults.baseURL = "/api";
Instance.defaults.headers.post["Content-Type"] = "application/json";
Instance.defaults.headers.post["Accept"] = "application/json";

// 定义一个flag 判断是否刷新Token中
let isRefreshing = false;
// 保存需要重新发起请求的队列
let retryRequests = [];

// 请求拦截
Instance.interceptors.request.use(async function (config) {
    Store.commit("startLoading");
    const userInfo = UserUtil.getLocalInfo();
    if (userInfo) {
        //业务需要把Token信息放在 params 里面，一般来说都是放在 headers里面
        config.params = Object.assign(config.params ? config.params : {}, {
            appkey: userInfo.AppKey,
            token: userInfo.Token
        });
    }
    return config;
});

// 响应拦截
Instance.interceptors.response.use(
    async function (response) {
            Store.commit("finishLoading");
            const res = response.data;
            if (res.errcode == 0) {
                return Promise.resolve(res);
            } else if (
                res.errcode == 30001 ||
                res.errcode == 40001 ||
                res.errcode == 42001 ||
                res.errcode == 40014
            ) {
                // 需要刷新Token 的状态 30001 40001 42001 40014
                // 拿到本次请求的配置
                let config = response.config;
                //   进入登录页面的不做刷新Token 处理
                if (Router.currentRoute.path !== "/login") {
                    if (!isRefreshing) {
                        // 改变flag状态，表示正在刷新Token中
                        isRefreshing = true;
                        //   刷新Token
                        return Store.dispatch("user/refreshToken")
                            .then(res => {
                                // 设置刷新后的Token
                                config.params.token = res.Token;
                                config.params.appkey = res.AppKey;
                                //   遍历执行需要重新发起请求的队列
                                retryRequests.forEach(cb => cb(res));
                                //   清空队列
                                retryRequests = [];
                                return Instance.request(config);
                            })
                            .catch(() => {
                                retryRequests = [];
                                Message.error("自动登录失败，请重新登录");
                                const code = Store.state.user.info.CustomerCode || "";
                                // 刷新Token 失败 清空缓存的用户信息 并调整到登录页面
                                Store.dispatch("user/logout");
                                Router.replace({
                                    path: "/login",
                                    query: {
                                        redirect: Router.currentRoute.fullPath,
                                        code: code
                                    }
                                });
                            })
                            .finally(() => {
                                // 请求完成后重置flag
                                isRefreshing = false;
                            });
                    } else {
                        // 正在刷新token，返回一个未执行resolve的promise
                        // 把promise 的resolve 保存到队列的回调里面，等待刷新Token后调用
                        // 原调用者会处于等待状态直到 队列重新发起请求，再把响应返回，以达到用户无感知的目的（无痛刷新）
                        return new Promise(resolve => {
                            // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
                            retryRequests.push(info => {
                                // 将新的Token重新赋值
                                config.params.token = info.Token;
                                config.params.appkey = info.AppKey;
                                resolve(Instance.request(config));
                            });
                        });
                    }
                }
                return new Promise(() => {});
            } else {
                return Promise.reject(res);
            }
        },
        function (error) {
            let err = {};
            if (error.response) {
                err.errcode = error.response.status;
                err.errmsg = error.response.statusText;
            } else {
                err.errcode = -1;
                err.errmsg = error.message;
            }
            Store.commit("finishLoading");
            return Promise.reject(err);
        }
);

export default Instance;