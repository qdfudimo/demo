## 一、WebSocket出现的原因
1、Http协议发布REST API 的不足：
每次请求响应完成之后，服务器与客户端之间的连接就断开了，如果客户端想要继续获取服务器的消息，必须再次向服务器发起请

求。这显然无法适应对实时通信有高要求的场景。

2、改善http的不足：Web通信领域出现了一些其他的解决方案，如轮询、长轮询、服务器推送事件、WebSocket
 1. 轮询：就是重复发送新的请求到服务器。如果服务器没有新的数据，就发送适当的指示并关闭连接。然后客户端等待一段时间

（比如间隔一秒），再发送另一个请求。这种实现方式相对比较简单，无须做过多的更改。但缺点是轮询的间隔过长，会导致用户不能及

时接收到更新的数据；轮询时间过短，会导致查询请求过多，增加服务器端的负担。

2. 长轮询：客户端发送一个请求到服务器，如果服务器端没有新的数据，就保持这个连接直到有数据。一旦服务器端有了数据

（消息）给客户端，它就使用这个连接发送数据给客户端，接着连接关闭

3. 服务器推送事件：Server-Sent Events（SSE）,SSE通常重用一个连接处理多个消息（事件）。SSE还定义了一个专门的媒体类

型，用于描述一个从服务端发送到客户端的简单格式。

4. WebSocket：提供了一个真正的全双工连接。发起者是一个客户端，发送一个带特殊HTTP头的请求到服务端，通知服务器。

该方案的优点是属于html5标准，已经被大多数浏览器支持，而且是真正的全双工，性能比较好，其缺点是实现起来比较复杂，需要对ws

协议专门处理。

WebSocket.Server(options[，callback])方法中options对象所支持的参数

（1）host：绑定服务器的主机名

（2）port：绑定服务器的端口号

（3）backlog：挂起连接队列的最大长度

（4）server：预先创建的node.js http/s服务器

（5）verifyClient：可用于验证传入连接的函数

（6）handleProtocols：可用于处理WebSocket子协议的函数

（7）path：仅接受与此路径匹配的连接

（8）noServer：不启用服务器模式

（9）clientTracking：指定是否跟踪客户端

（10）perMessageDeflate：启用/禁用消息压缩

（11）maxPayload：允许的最大消息大小（以字节为单位）