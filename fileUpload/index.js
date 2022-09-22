const express = require("express");
const path = require('path');
const app = express();
const multiparty = require('multiparty');
const fs = require('fs');
// 用 body-parser 库进行数据格式转换
// let bodyParser = require("body-parser")
// app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json())
const STATIC_TEMPORARY = path.join(__dirname, './chunkTemp')
// 上传文件最终路径
const STATIC_FILES = path.join(__dirname, './img')
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Accept,Content-type");
    res.header("Access-Control-Allow-Credentials", true);
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8")
    if (req.method.toLowerCase() == 'options')
        res.sendStatus(200); //让options尝试请求快速结束
    else
        next();
});
app.post('/upload', (req, res) => {
    // 设置文件暂存地址
    let form = new multiparty.Form({
        uploadDir: './tmp'
    });
    form.parse(req, (err, fields, files) => {
        let file = files.chunk[0];
        let filename = fields.filename[0]
        let hash = fields.hash[0]
        console.log(fields);
        console.log(files);
        try {
            // 转换文件名，存到对应文件夹下
            let dir = `${STATIC_TEMPORARY}/${filename}`
            let buffer = fs.readFileSync(file.path)
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir)
            }
            fs.writeFileSync(`${dir}/${hash}`, buffer)
            fs.unlinkSync(file.path);
            res.send({
                status: 200,
                message: `${filename}-${hash} 切片上传成功`
            })
        } catch (error) {
            res.send({
                status: 400,
                message: "上传失败"
            })
        }
    });
})
//合并切片接口
app.get('/merge', async (req, res) => {
    const {
        filename
    } = req.query
    console.log(filename);
    try {
        let len = 0
        const bufferList = fs.readdirSync(`${STATIC_TEMPORARY}/${filename}`).map((hash, index) => {
            const buffer = fs.readFileSync(`${STATIC_TEMPORARY}/${filename}/${index+1}`)
            console.log(buffer);
            len += buffer.length
            return buffer
        });
        emptyDir(`${STATIC_TEMPORARY}/${filename}`)
        fs.rmdirSync(`${STATIC_TEMPORARY}/${filename}`)
        //合并文件
        const buffer = Buffer.concat(bufferList, len);
        fs.writeFileSync(`${STATIC_FILES}/${filename}`, buffer)
        res.send(`切片合并完成`);
    } catch (error) {
        console.error(error);
    }
})
app.listen(3000, () => {
    console.log("服务启动了");
})


/**
 * 删除文件夹下所有问价及将文件夹下所有文件清空
 * @param {*} path 
 */
function emptyDir(path) {
    const files = fs.readdirSync(path);
    files.forEach(file => {
        const filePath = `${path}/${file}`;
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            emptyDir(filePath);
        } else {
            fs.unlinkSync(filePath);
            console.log(`删除${file}文件成功`);
        }
    });
}