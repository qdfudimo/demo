onmessage = (e) => {
    console.log(e);
    postMessage("子线程发送信息")
}