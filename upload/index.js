const express = require('express')
const multiparty = require('multiparty')
const fs = require('fs')
const path = require('path')
const { Buffer } = require('buffer')
// 上传文件最终路径
const STATIC_FILES = path.join(__dirname, './static/files')
// 上传文件临时路径
const STATIC_TEMPORARY = path.join(__dirname, './static/temporary')
const server = express()
// 静态文件托管
server.use(express.static(path.join(__dirname, './dist')))
// 切片上传的接口
server.post('/upload', (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        let filename = fields.filename[0]
        let hash = fields.hash[0]
        let chunk = files.chunk[0]
        let dir = `${STATIC_TEMPORARY}/${filename}`
        // console.log(filename, hash, chunk)
        try {
            if (!fs.existsSync(dir)) fs.mkdirSync(dir)
            const buffer = fs.readFileSync(chunk.path)
            const ws = fs.createWriteStream(`${dir}/${hash}`)
            ws.write(buffer)
            ws.close()
            res.send(`${filename}-${hash} 切片上传成功`)
        } catch (error) {
            console.error(error)
            res.status(500).send(`${filename}-${hash} 切片上传失败`)
        }
    })
})
//合并切片接口
server.get('/merge', async (req, res) => {
    const { filename } = req.query
    try {
        let len = 0
        const bufferList = fs.readdirSync(`${STATIC_TEMPORARY}/${filename}`).map((hash, index) => {
            const buffer = fs.readFileSync(`${STATIC_TEMPORARY}/${filename}/${index}`)
            len += buffer.length
            return buffer
        });
        //合并文件
        const buffer = Buffer.concat(bufferList, len);
        const ws = fs.createWriteStream(`${STATIC_FILES}/${filename}`)
        ws.write(buffer);
        ws.close();
        res.send(`切片合并完成`);
    } catch (error) {
        console.error(error);
    }
})

server.listen(3000, _ => {
    console.log('http://localhost:3000/')
})