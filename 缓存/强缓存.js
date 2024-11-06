const http = require('http')
const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Cache-Control': 'max-age=10',
        "Access-Control-Allow-Origin": "*"
    })
    res.end('我要缓存')
})
server.listen(8080, () => {
    console.log('服务已启动在', server.address());
})


// const server = http.createServer((req, res) => {
//     const expires = new Date();
//     expires.setDate(expires.getDate() + 7);
//     res.setHeader('Expires', expires.toUTCString());
//     res.writeHead(200, {
//         "Access-Control-Allow-Origin": "*"
//     })
//     res.end('我要缓存')
// })
// server.listen(8080, () => {
//     console.log('服务已启动在', server.address());
// })