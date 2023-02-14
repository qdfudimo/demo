const express = require('express')
let app = express()
app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Content-Type', 'application/json;charset=utf-8');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	next();
});
let index = 1
app.get('/test', (req, res) => {
	console.log("触发了");
	setTimeout(() => {
		res.send('this is a test message' + index);
	}, 2000);
	index++
})
// 将前端项目所在文件夹设置为静态资源
app.use('/', express.static('./index.html', {
	cacheControl: false,
	etag: false,
	lastModified: false
}))
// app.js

app.listen(3000, _ => {
	console.log('http://localhost:3000/')
})