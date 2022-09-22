const path = require("path");
//清除上一次的打包文件
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const BundleAnalyzerPlugin =
    require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//在设置 node.js 环境变量   变成开发环境
process.env.NODE_ENV = "production"
// process.env.NODE_ENV = "development";
module.exports = {
    //入口文件
    entry: "./src/index.js",
    //输出文件
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js',
        // chunkFilename: "js/[name][contenthash:10]_chunk.js"
    },
    module: {
        rules: []
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new BundleAnalyzerPlugin(),
    ],
    resolve: {
        //省略后缀名
        extensions: ['.js', '.json']
    },
    optimization: {
        //在开发模式下配置 tree shakeing
        usedExports: true,
        //压缩js
        minimize: true,
        splitChunks: {
            chunks: 'all',
            //生成 chunk 的最小体积
            minSize: 0,
            // minSize: 30 * 1024,
            //webpack 将使用 chunk 的来源和名称生成名称（例如 vendors~main.js）
            automaticNameDelimiter: "~",
            // name:true,
            cacheGroups: {
                // vendors: {
                //     test: /[\\/]node_modules[\\/]/,
                //     //优先级
                //     priority:0,
                //     reuseExistingChunk: true,
                //     name: 'vendors',
                // },
                default: {
                    test: /[\\/]utils[\\/]/,
                    //优先级
                    priority: -20,
                    reuseExistingChunk: true,
                    name: 'utils',
                },
                // commons: {
                //     name: 'commons',
                //     chunks: 'initial',
                //     minChunks: 2,
                //   },
            },
        },

    },
    // development, production 或 none 之中的一个，来设置 mode 参数
    mode: "development",
}