// worker.js
self.onmessage = (messageEvent) => {
    console.log(messageEvent,"接收的");
    this.postMessage("我是worker发送的");
};