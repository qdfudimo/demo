
const { name } = require('./package');
const BuildVersionPlugin = require("./plugin/build-version-plugin.js")
const pkg = require('./package.json')
module.exports = {
  devServer: {
    port: 1111,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  // publicPath:"/vue-hash/",
  // outputDir:"production",
  // assetsDir:"production-sub-path",
  chainWebpack: (config) => {
    config.module
      .rule('fonts')
      .test(/.(ttf|otf|eot|woff|woff2)$/)
      .use('url-loader')
      .loader('url-loader')
      .tap(options => ({ name: '/fonts/[name].[hash:8].[ext]' }))
      .end()
  },
  // 自定义webpack配置
  configureWebpack: {
    plugins: [
      new BuildVersionPlugin(pkg)
    ],
    output: {
      library: `${name}`,
      libraryTarget: 'umd',// 把子应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};