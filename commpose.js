// function compose(...funcs) {
//     return funcs
//         .reverse()
//         .reduce((fn1, fn2) => (...args) => fn2(fn1(...args)));
// }

// let a = (...args) => fn2(fn1(...args))

// function aa(...args) {
//     fn3(a(...args))
// }
const add1 = (x) => x + 1;
const mul3 = (x) => x * 3;
const div2 = (x) => x / 2;
// div2(mul3(add1(0))); //=>3

function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
// console.log(compose(add1, mul3)(0));
// console.log(compose(add1, mul3, div2)(0));

function aaa1(...args) {
    return add1(mul3(...args))
        // return div2((...args) => add1(mul3(...args)))
}
console.log(aaa1(0));
// (...args) => div2((...args) => add1(mul3(...args)))