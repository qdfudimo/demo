/**
 * 解码
 * @canvas 画布
 * @colorKey 解码rgb中的那个色值
 * @flag	色值的奇偶切换成最大值或者最小值
 * @otherColorValue 其他色值如何处理
 * */
export const decode = (canvas, colorKey, flag, otherColorValue) => {
	const ctx = canvas.getContext('2d');
	const originalData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
	let data = originalData.data;
	for (let i = 0; i < data.length; i++) {
		//筛选每个像素点的R值
		if (i % 4 == colorKey) {
			if (data[i] % 2 == 0) {
				//如果色值为偶数
				data[i] = flag ? 255 : 0;
			} else {
				//如果色值为奇数
				data[i] = flag ? 0 : 255;
			}
		} else if (i % 4 == 3) {
			//透明度不作处理
			continue;
		} else {
			// 关闭其他色值
			if (otherColorValue !== undefined) {
				data[i] = otherColorValue
			}
		}
	}
	ctx.putImageData(originalData, 0, 0);
}

/**
 * 加密（水印文本与图片像素合并）
 * @ctx 画布
 * @newData 水印文本画布
 * @color 置顶处理色值
 * @originalData 图片画布
 * */
export const encode = (ctx, textData, color, originalData) => {
	let offset;
	switch (color) {
		case 0:
			offset = 3;
			break;
		case 1:
			offset = 2;
			break;
		case 2:
			offset = 1;
			break;
	}
	for (let i = 0; i < originalData.data.length; i++) {
		// 只处理目标色值
		if (i % 4 == color) {
			// 水印画布透明度为0
			if (textData[i + offset] === 0 && (originalData.data[i] % 2 === 1)) {
				// 放置越界
				if (originalData.data[i] === 255) {
					originalData.data[i]--;
				} else {
					originalData.data[i]++;
				}
				// 水印画布透明度不为0
			} else if (textData[i + offset] !== 0 && (originalData.data[i] % 2 === 0)) {
				originalData.data[i]++;
			}
		}
	}
	ctx.putImageData(originalData, 0, 0);
}

/***
 * 创建canvas写入水印内容
 * */
export const createWaterMark = ({ width, height, fillStyle, opacity, font, rotate, text }) => {
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = fillStyle;
	ctx.globalAlpha = opacity;
	ctx.font = font
	ctx.rotate(Math.PI / 180 * rotate);
	ctx.fillText(text, 0, 50);
	return canvas
}


/**
 * canvas固定宽高，写入图片是计算图片位置及大小
*/
export const aspectFit = (imageWidth, imageHeight, canvasWidth, canvasHeight) => {
	const imageRate = imageWidth / imageHeight
	const canvasRate = canvasWidth / canvasHeight
	let [dx, dy, dw, dh] = []
	if (imageRate >= canvasRate) {
		dw = canvasWidth
		dh = canvasWidth / imageRate
	} else {
		dh = canvasHeight
		dw = canvasHeight * imageRate
	}
	dx = (canvasWidth - dw) / 2
	dy = (canvasHeight - dh) / 2
	return [dx, dy, dw, dh]
}