const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs')
const mime = require('mime')
const checksum = require('checksum')
const server = http.createServer((req, res) => {
    const srcUrl = url.parse(`${req.url}`)
    const resPath = 'www/test.txt'
    const {
        ext
    } = path.parse(resPath)
    res.setHeader('Access-Control-Allow-Origin', '*')
    if (!fs.existsSync(resPath)) {
        res.writeHead(404, {
            "Content-Type": 'text/html'
        })
        return res.end('<h1>404 Not Found<h1>')
    }

    checksum.file(resPath, (err, sum) => {
        const resStream = fs.createReadStream(resPath)
        sum = `"${sum}"`
        if (req.headers['if-none-match'] === sum) {
            res.writeHead(304, {
                'Content-Type': mime.getType(ext),
                etag: sum
            })
            res.end()

        } else {
            res.writeHead(200, {
                'Content-Type': mime.getType(ext),
                etag: sum
            })
            resStream.pipe(res)
        }
    })
})
server.listen(8080, () => {
    console.log('服务已启动');
})