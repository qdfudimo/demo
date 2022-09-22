# webpack
webpack配置学习
## 插件配置列表
<ul>
<li>html-webpack-plugin
<li>clean-webpack-plugin
<li>progress-bar-webpack-plugin
</ul>

```
克隆仓库
git clone https://github.com/qdfudimo/webpack.git
安装依赖
npm install
打包
npm run build
启动
npm run dev
```
---
**实现效果**
1. 实现加载css  
``` 
style-loader
css-loader
```
3. 实现css前缀自动补充
`postcss-loader`
4. 实现css以文件形式导出
`mini-css-extract-plugin`
5. 实现自动生成html文件
`html-webpack-plugin`
6. 实现打包清空dist文件
`clean-webpack-plugin`
7. 实现图片在js文件中引入
```
file-loader+url-loader
webpack5可以使用
type: "asset/resource",发送一个单独的文件并导出URL file-loader
type: "asset/inline",导出一个资源的data URL url-loader
type: "asset" 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现
```
[webpack5 asset模块](https://webpack.docschina.org/guides/asset-modules/)
8. 实现图片在css文件中引入
以上全部适用
9. 实现webpack本地服务
```
webpack-dev-serve
```
10. es6代码兼容
```
bable-loader及bable插件
@babel/preset-env 支持let、const、箭头函数等
@babel/plugin-transform-runtime 支持[].includes()、Promise等
@babel/plugin-proposal-class-properties 支持类class
```
11. tree shaking
12. 压缩js代码
`terser-webpack-plugin`
```
//调试
devtool:eval
//缓存模块, 避免在未更改时重建它们。
cache:true
//缓存已解决的依赖项, 避免重新解析它们。
module.unsafeCache:true
//在 bundle 中引入「所包含模块信息」的相关注释
output.pathinfo:true
//在可能的情况下确定每个模块的导出,被用于其他优化或代码生成。
optimization.providedExports:true
//找到chunk中共享的模块,取出来生成单独的chunk
optimization.splitChunks:true
//为 webpack 运行时代码创建单独的chunk
optimization.runtimeChunk:true
//编译错误时不写入到输出
optimization.noEmitOnErrors:true
//给模块有意义的名称代替ids
optimization.namedModules:true
//给模chunk有意义的名称代替ids
optimization.namedChunks:true
//性能相关配置
performance:{hints:"error"....}
//某些chunk的子chunk已一种方式被确定和标记,这些子chunks在加载更大的块时不必加载
optimization.flagIncludedChunks:true
//给经常使用的ids更短的值
optimization.occurrenceOrder:true
//确定每个模块下被使用的导出
optimization.usedExports:true
//识别package.json or rules sideEffects 标志
optimization.sideEffects:true
//尝试查找模块图中可以安全连接到单个模块中的段。- -
optimization.concatenateModules:true
//使用uglify-js压缩代码
optimization.minimize:true
//打包生产模式
webpack --mode=production
```
```
babel-polyfill 的原理是当运行环境中并没有实现的一些方法，babel-polyfill会做兼容。
babel-runtime 它是将es6编译成es5去执行。我们使用es6的语法来编写，最终会通过babel-runtime编译成es5.也就是说，不管浏览器是否支持ES6，只要是ES6的语法，它都会进行转码成ES5.所以就有很多冗余的代码。
babel-polyfill 它是通过向全局对象和内置对象的prototype上添加方法来实现的。比如运行环境中不支持Array.prototype.find 方法，引入polyfill, 我们就可以使用es6方法来编写了，但是缺点就是会造成全局空间污染。
babel-runtime: 它不会污染全局对象和内置对象的原型，比如说我们需要Promise，我们只需要import Promise from 'babel-runtime/core-js/promise'即可，这样不仅避免污染全局对象，而且可以减少不必要的代码。
虽然 babel-runtime 可以解决 babel-polyfill中的避免污染全局对象，但是它自己也有缺点的，比如上，如果我现在有100个文件甚至更多的话，难道我们需要一个个文件加import Promise from 'babel-runtime/core-js/promise' 吗？那这样肯定是不行的，因此这个时候出来一个 叫 babel-plugin-transform-runtime，
它就可以帮助我们去避免手动引入 import的痛苦，并且它还做了公用方法的抽离。比如说我们有100个模块都使用promise，但是promise的polyfill仅仅存在1份。
这就是 babel-plugin-transform-runtime 插件的作用。
https://www.cnblogs.com/tugenhua0707/p/9452471.html
```
