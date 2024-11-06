const r = Function.prototype.call.apply((a)=>a,[1,2])
/**
 * 先执行 apply 参数是1,2 函数中的this是(a)=>a
 * 假设 fn= (a) => a
 * fn1 = Function.prototype.call
 * fn1.apply(fn,[1,2]) fn是当前 fn1(Function.prototype.call)的this
 * 也就是fn.call (相当于fn.fn1)
 * fn.call(1,2) 1 是当前fn的this
 * 1.fn(2)
 */

let a =[1,2]
for (let i = 0; i < a.length; i++) {
    if(a==1) {

    }else if (a==2){

    }
}