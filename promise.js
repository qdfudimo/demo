 // 定义Promise的三种状态常量
 const PENDING = 'PENDING'
 const FULFILLED = 'FULFILLED'
 const REJECTED = 'REJECTED'
 const isFunction = variable => typeof variable === 'function'
 class MyPromise {
     constructor(exctour) {
         if (!isFunction(exctour)) {
             throw new Error('MyPromise must accept a function as a parameter')
         }
         this.Pending = PENDING
         // 添加状态
         this._value = undefined
         // 添加成功回调函数队列
         this._fulfilledQueues = []
         // 添加失败回调函数队列
         this._rejectedQueues = []
         try {
             exctour(this._resolve.bind(this), this._reject.bind(this))
         } catch (err) {
             this._reject(err)
         }
     }
     _resolve(value) {
         if (this.Pending != PENDING) return
         console.log(value);
         this._value = value
         this.Pending = FULFILLED
     }
     _reject(err) {
         if (this.Pending != PENDING) return
         console.log(err);
         this._value = err
         this.Pending = REJECTED
     }
     then(onFulfilled, onRejected) {
         let {
             _value,
             Pending
         } = this
         switch (Pending) {
             // 当状态为pending时，将then方法回调函数加入执行队列等待执行
             case PENDING:
                 this._fulfilledQueues.push(onFulfilled)
                 this._rejectedQueues.push(onRejected)
                 break
                 // 当状态已经改变时，立即执行对应的回调函数
             case FULFILLED:
                 onFulfilled(_value)
                 break
             case REJECTED:
                 onRejected(_value)
                 break
         }
     }
 }
 //  new MyPromise((res, rej) => {
 //      res("成功的")
 //      rej("失败的")
 //  })
 // console.log(Promise.all);
 const p1 = Promise.resolve(1)
 const p2 = new Promise((resolve) => {
     setTimeout(() => resolve(2), 1000)
 })
 const p3 = new Promise((resolve) => {
     setTimeout(() => resolve(3), 3000)
 })

 const p4 = Promise.reject('err4')
 const p5 = Promise.reject('err5')

 // 1. 所有的Promise都成功了
 //  const p11 = Promise.all([p1, p2, p3])
 //      .then(console.log) // [ 1, 2, 3 ]
 Promise.myAll = (promises) => {
     return new Promise((resolve, reject) => {
         let counter = 0;
         let result = [];
         let len = promises.length
         promises.forEach((item, i) => {
             Promise.resolve(item).then(res => {
                 counter++
                 result[i] = res
                 if (counter == len) {
                     resolve(result)
                 }
             }).catch(err => {
                 reject(err)
             })
         });
     })
 }
 const p11 = Promise.myAll([p1, p2, p3])
     .then(console.log) // [ 1, 2, 3 ]