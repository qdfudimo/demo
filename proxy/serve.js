const express = require('express')
const { createProxyMiddleware  } = require('http-proxy-middleware')
let app = express()

// 对/api开头请求进行转发处理
app.use('/api', createProxyMiddleware({ 
	// 转发到5000端口
	target: 'http://localhost:5000',
	// 转发时重写路径
	pathRewrite: {'^/api' : ''},
	changeOrigin: true }));

// 将前端项目所在文件夹设置为静态资源
app.use('/', express.static('./index', {
	  cacheControl: false,
	  etag: false,
	  lastModified: false
}))
app.listen(3000, _ => {
    console.log('http://localhost:3000/')
})
