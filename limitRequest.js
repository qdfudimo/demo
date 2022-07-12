class Scheduler {
    constructor(limit) {
        this.queue = []
        this.limit = limit
        this.count = 0
    }

    add(time, order) {
        const promiseCreator = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(order)
                }, time)
            })
        }
        this.queue.push(promiseCreator)
    }

    taskStart() {
        for (let i = 0; i < this.limit; i++) {
            this.request()
        }
    }

    request() {
        if (!this.queue.length || this.count >= this.limit) return
        this.count++
        this.queue.shift()().then(res => {
            this.count--
            this.request()
        })
    }
    async limitRequest () {
        let pool = []
        if (this.limit >= this.queue.length) {
            Promise.all(this.queue)
            return
        }
        for (let i = 0; i < this.queue.length; i++) {
            console.log(i, "-------");
            let p = this.queue[i]()
            p.then((res) => {
                console.log(res);
                pool.splice(pool.indexOf(p), 1)
            })
            pool.push(p);
            if (pool.length == this.limit) {
                console.log(111);
                await Promise.race(pool)
                console.log(2222);
            }
        }
    }
}

const scheduler = new Scheduler(2);
const addTask = (time, order) => {
    scheduler.add(time, order);
};
addTask(6000, "1");
addTask(5000, "2");
addTask(3000, "3");
addTask(4000, "4");
// scheduler.taskStart();
scheduler.limitRequest();
async function demo() {
    let pool = [] //并发池
    let max = 3 //最大并发量
    let len = 5
    for (let i = 0; i < len; i++) {
        // 上传切片
        let task = new Promise((resolve, reject) => {
            console.log(i, "resolve");
            setTimeout(() => {
                resolve(i)
            }, Math.floor(Math.random() * 10) * 1000);
        })
        task.then((data) => {
            console.log(data);
            //请求结束后将该Promise任务从并发池中移除
            let index = pool.findIndex(t => t === task)
            pool.splice(index,1)
        })
        pool.push(task)
        if (pool.length === max) {
            console.log("并发");
            //每当并发池跑完一个任务，就再塞入一个任务
            await Promise.race(pool)
            console.log("并发1111");
        }
    }
    await Promise.all(pool)
    console.log("结束了");
}
// demo()