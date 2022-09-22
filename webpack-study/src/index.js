// import {
//     test,testBable
// } from './a.js'
import {
    add
} from './b.js'
//webpackChunkName，它其实就是对chunkFilename定义时[name]值的改写，/* webpackChunkName: "hello" */，意味着[name]等于hello。
import(/*webpackChunkName:'hello'*/'./a.js').then(({
    testBable
}) => {
    testBable()
})
add(2, 6)