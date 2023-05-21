const noop = () => {}
class eventBus {
    constructor() {
        this.eventArr = {}
        this.callbcakId = 0
    }

    //订阅
    on(eventName, func) {
            if (!this.eventArr[eventName]) {
                this.eventArr[eventName] = {}
            }
            // 定义当前回调函数id
            let id = this.callbcakId++;
            this.eventArr[eventName][id] = func;
            return id
        }
        //触发事件
    emit(eventName) {
            if (!this.eventArr[eventName]) return
            let args = [...arguments].slice(1)
            let eventList = this.eventArr[eventName];
            for (const key in eventList) {
                eventList[key](...args)
                if (key.indexOf("D") != -1) {
                    delete eventList[key]
                }
            }
        }
        //触发一次
    once(eventName) {
            if (!this.eventArr[eventName]) {
                this.eventArr[eventName] = {}
            }
            // 定义当前回调函数id
            let id = this.callbcakId++;
            this.eventArr[eventName][id + "D"] = func;
        }
        //解绑
    off(eventName, id) {
        let eventList = this.eventArr[eventName];
        delete eventList[id]
        console.log("取消订阅了", eventName, id);
        if (!Object.keys(eventList).length) {
            delete this.eventArr[eventName];
        }
    }
}
// export default eventBus