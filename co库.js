/**
 * 自动执行迭代器
 * @param {*} it generator执行返回的迭代器函数
 * @returns 
 */
function co(it) {
    return new Promise((resolve, reject) => {
      function next(data) { // 将上一次的结果作为下一次的入参
        let { value, done } = it.next(data);
        if (done) { // 迭代器执行完成，返回最终结果
          resolve(value);
        } else {
          // 备注：使用 Promise.resolve 将 value 包装成Promise
          // 成功：说明迭代器还没有执行完，继续递归调用 next，直至迭代器完成
          Promise.resolve(value).then(next, reject);// 注意此处的 next 传入的是当前 function
        }
      }
  
      next();// 第一次调用 next 时，传参是无效的
    })
  }


function WX() {
  
}
WX.prototype.nexTick = function () {
  
}
//重写
let originalNexTick = WX.prototype.nexTick
WX.prototype.nexTick= function (...arr) {
  //判断是不是抖音小程序
  if("抖音小程序") {

  }else {
    //不是抖音小程序
    originalNexTick.apply(WX,arr)
  }
}