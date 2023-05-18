function add(a, b, c) {
    return a + b + c
}

function currying(fn) {
    let length = fn.length;
    let args = [].slice.call(arguments, 1);
    return function() {
        let _args = args.concat([...arguments]); // 合并参数
        if (_args.length < length) { // 未接收完参数
            return currying.call(this, fn, ..._args);
        } else { // 接受完所有参数，直接执行
            return fn.apply(this, _args);
        }
    }
}
const sum = currying(add, 1);
console.log(sum(2, 3)); // 6
console.log(sum(2)(3)); // TypeError