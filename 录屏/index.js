let buffer = [],
    mediaRecorder,
    allStream;

class WebRTCAction {
    start() {
        if (!navigator.mediaDevices) {
            alert('你的浏览器不支持这个特性');
            return null;
        }
        navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: false
        }).then((stream) => {
            allStream = stream;
            document.querySelector('#player').srcObject = stream;
            console.log('分享成功')
        }).catch((err) => {
            console.error(err);
        })
    }
    record() {
        const options = {
            mimeType: 'video/webm;codecs=vp8'
        }
        // 判断是否是支持的mimeType格式
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            console.error('不支持的视频格式');
            return;
        }
        try {
            mediaRecorder = new MediaRecorder(allStream, options);
            // 处理采集到的事件
            mediaRecorder.ondataavailable = function (e) {
                if (e && e.data && e.data.size > 0) {
                    // 存储到数组中
                    buffer.push(e.data);
                }
            };
            // 开始录制
            mediaRecorder.start(10);
            console.log('开始录制', mediaRecorder.state);
        } catch (e) {
            console.error(e);
        }
    }
    download() {
        mediaRecorder.stop();
        if (buffer.length) {
            const blob = new Blob(buffer, {
                type: 'video/webm'
            });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.style.display = 'none';
            a.download = 'webRTC.webm';
            a.click();
            console.log('下载成功', mediaRecorder.state)
        } else {
            alert('还没有录制任何内容');
        }
    }
    stop() {
        if (mediaRecorder) {
            mediaRecorder.stop();
            console.log('停止成功', mediaRecorder.state)
        }
    }
}

const webAction = new WebRTCAction()

document.querySelector('#start').onclick = () => {
    webAction.start()
}

document.querySelector('#record').onclick = () => {
    webAction.record()
}

document.querySelector('#download').onclick = () => {
    webAction.download()
}

document.querySelector('#stop').onclick = () => {
    webAction.stop()
}