const app = getApp();
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {},
	
	/**
	 * 组件的初始数据
	 */
	data: {
		cell: 8,
		canvasW: app.globalData.screenWidth,
		padding: 30,
		minValueS: 0,
		maxValueS: 100,
		currentValueS: 170,
		statureW:0
	},
	
	attached () {
		this.drawRuler(this.data.minValueS, this.data.maxValueS, this.data.currentValueS, 'numerical', '');
		var ratio = this.data.cell;// 每个刻度所占位的px
		// 1.5 画布宽度
		var canvasWidth = (this.data.maxValueS - this.data.minValueS) * ratio + this.data.canvasW - this.data.padding * 2;
		this.setData({
			statureW: canvasWidth,
		});
	},
	
	/**
	 * 组件的方法列表
	 */
	methods: {
		drawRuler: function (min, max, current, carrier, unit) {
			var ratio = this.data.cell;// 每个刻度所占位的px
			/**
			 * min 最小刻度, max 最大刻度, current 当前刻度 , carrier 画布id, unit 显示单位
			 */
			/* 1.定义变量 */
			// 1.1 定义原点与终点，x轴方向起点与终点各留半屏空白
			var origion = { x: this.data.canvasW / 2 - this.data.padding, y: 40 };
			
			// 1.2 定义刻度线高度
			var height = 30; //10刻度的高
			var middle = 23; //5刻度的高
			var low = 16; //其他刻度高
			var lineY_w = 1;//刻度线线宽
			var lineX_w = 3;//水平线线宽
			// 1.3 定义文本标签字体大小
			var fontSize = 12;
			
			/* 2.绘制 */
			// 2.1初始化context
			const ctx = wx.createCanvasContext(carrier, this);
			
			//兼容最小刻度不是整数的情况
			var minus = 0;
			if (min % 10 != 0) {
				minus = min % 10;
			}
			
			//画水平粗线
			ctx.setLineWidth(lineX_w);
			ctx.setStrokeStyle('#9aaac0');
			ctx.moveTo(origion.x - minus * ratio, origion.y - lineX_w / 2);
			ctx.lineTo((max - min) * ratio + origion.x, origion.y - lineX_w / 2);
			ctx.stroke();
			
			// 遍历maxValue
			for (var i = 0; i <= max - min + minus; i++) {
				ctx.beginPath();
				ctx.setLineWidth(lineY_w);
				// 2.2 画刻度线
				ctx.moveTo(origion.x + i * ratio - minus * ratio, origion.y);
				// 画线到刻度高度，5/10的位数就加高
				if (i / 2 % 5 == 0) {
					ctx.lineTo(origion.x + i * ratio - minus * ratio, origion.y - height);
				} else if (i % 5 == 0) {
					ctx.lineTo(origion.x + i * ratio - minus * ratio, origion.y - middle);
				} else {
					ctx.lineTo(origion.x + i * ratio - minus * ratio, origion.y - low);
				}
				ctx.setStrokeStyle('#9aaac0');
				// 描线
				ctx.stroke();
				
				// 2.3 描绘文本标签
				ctx.setFontSize(fontSize);
				ctx.setFillStyle('#99a9bf');
				if (i == 0 && minus > 0) {
					ctx.fillText(min - minus + unit, origion.x + (i - minus) * ratio - fontSize * ((min - minus).toString().length / 2 + unit.length) / 2, fontSize + 50);
				}
				if ((i + minus) % 10 == 0) {
					// if (i == 0 && minus > 0) {
					//     minus += 10;
					// }
					ctx.fillText(i + min + unit, origion.x + i * ratio - fontSize * ((i + min).toString().length / 2 + unit.length) / 2, fontSize + 50);
				}
				ctx.closePath();
			}
			// 2.4 绘制到context
			ctx.draw();
		}
	}
});
