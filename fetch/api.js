const express = require('express')
let app = express()

app.get('/test', (req,res)=>{
    console.log("触发了");
	res.send('this is a test message');	
})
// 监听在另一个端口
app.listen(5000);
