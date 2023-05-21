 import EventBus from "./eventBus.js";
 class MyWebSocket extends WebSocket {
     constructor(url, protocols) {
             super(url, protocols)
         }
         /**
          * 
          * @param {*} heardConfig time：心跳时间间隔 timeout：心跳超时间隔 reconnect：断线重连时
          */
     init(heardConfig) {
         this.onopen = this.openHandler; //连接上时回调
         this.onclose = this.closeHandler; //断开连接时回调
         this.onmessage = this.messageHandler; //收到服务端消息
         this.onerror = this.errorHandler; //连接出错
         this.webSocketState = false; //连接出错
         this.heardConfig = heardConfig; //连接出错
         this.rennocetTimer = null; //连接出错
         this.startHeardBeat()
     }
     openHandler() {
         this.webSocketState = true
         console.log("---连接成功---");
         if (this.rennocetTimer) {
             clearInterval(this.rennocetTimer)
             this.rennocetTimer = null
         }
     }
     closeHandler() {
         this.webSocketState = false;
         if (this.rennocetTimer) {
             clearInterval(this.rennocetTimer)
             this.rennocetTimer = null
         }
         console.log("---主动关闭了---");
     }
     startHeardBeat() {
         setTimeout(() => {
             this.sendMsg({
                 ModeCode: "heart_beat",
                 msg: "客户端发送的心跳",
             })
             this.waitingServer()
         }, this.heardConfig.time)
     }
     waitingServer() {
         this.webSocketState = false
         setTimeout(() => {
             if (this.webSocketState) {
                 this.startHeardBeat()
                 return
             }
             console.log("心跳无响应，已断线");
             try {
                 this.close();
             } catch (e) {
                 console.log("连接已关闭，无需关闭");
             }
             this.rennocetServe();
         }, this.heardConfig.timeout)
     }
     rennocetServe() {
         this.rennocetTimer = setInterval(() => {
             EventBus.emitEvent("reconnect");
         }, this.heardConfig.reconnect)
     }
     messageHandler(e) {
         this.webSocketState = true
         let data = this.getMsg(e)
         switch (data.ModeCode) {
             case "message":
                 console.log(data, "0000000");
                 EventBus.emitEvent("onMsg", data.msg)
                 break;
             case "heart_beat":
                 console.log(`收到心跳${data.msg}`);
                 break;
         }
     }
     errorHandler(e) {
         this.webSocketState = false;
         this.rennocetServe()
         console.log("---连接出错---", e);
     }
     sendMsg(obj) {
         this.send(JSON.stringify(obj));
     }

     getMsg(e) {
         return JSON.parse(e.data);
     }
 }
 export default MyWebSocket