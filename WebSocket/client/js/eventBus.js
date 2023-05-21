class EventBus {
    constructor() {
        this.eventArr = {}
        this.callbcakId = 0
    }
    static Instance() {
        //返回当前类的实例的单例
        if (!EventBus._instance) {
            Object.defineProperty(EventBus, "_instance", {
                value: new EventBus(),
            });
        }
        return EventBus._instance;
    }

    emitEvent(name) {
        if (!this.eventArr[name]) return
        let args = [...arguments].slice(1)
        this.eventArr[name].forEach(item => {
            item(...args)
        });
    }
    onEvent(name, callBack) {
        if (!this.eventArr[name]) {
            this.eventArr[name] = []
        }
        this.eventArr[name].push(callBack)
    }
    offEvent() {

    }
}
export default EventBus.Instance()