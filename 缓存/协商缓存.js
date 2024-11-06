const http = require('http')
const path = require('path')
const fs = require('fs')
const mime = require('mime')

const server = http.createServer((req, res) => {
    let filePath = path.resolve(__dirname, path.join('www/test.txt', req.url))
    if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath) // fs.statSync判断当前资源是文件还是路径
        if (fs.existsSync(filePath)) {
            const {
                ext
            } = path.parse(filePath)
            const stats = fs.statSync(filePath)
            let status = 200
            const timeStamp = req.headers['if-modified-since']
            if (timeStamp && Number(timeStamp) === stats.mtimeMs) {
                //资源在后端没有修改过
                status = 304
            }
            res.writeHead(status, {
                'Content-Type': mime.getType(ext),
                'Last-Modified': stats.mtimeMs, // 协商缓存的响应头
                "Access-Control-Allow-Origin": '*'
            })
            if (status === 200) {
                const fileStream = fs.createReadStream(filePath) // 把文件读取成流类型
                fileStream.pipe(res) // 将文件流流入响应流对象中
            } else {
                res.end()
            }
        }
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        res.end('<h1> Not Found</h1>')
    }
})
server.listen(8080, () => {
    console.log('服务已启动');
})