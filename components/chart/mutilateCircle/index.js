const app = getApp();
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {},
	
	/**
	 * 页面的初始数据
	 */
	data: {
		cell: app.globalData.screenWidth / 750,
		chartStrokeStyle: { width: 1, color: '#999999' },
		chartMaxRadius: 200,
		chartAnnulusWidth: 30,
		radiusCell: (2 * Math.PI) / 100,
		step: 0
	},
	attached () {
		this.draw([
			{ basic: '#ff0000', extension: '#DB7093', basicNum: 60, extensionNum: 20 },
			{ basic: '#912CEE', extension: '#9F79EE', basicNum: 50, extensionNum: 10 },
			{ basic: '#7FFF00', extension: '#66CD00', basicNum: 50, extensionNum: 30 },
			{ basic: '#CDCD00', extension: '#EEEE00', basicNum: 60, extensionNum: 35 },
			{ basic: '#00868B', extension: '#009ACD', basicNum: 60, extensionNum: 10 }
		]);
	},
	/**
	 * 组件的方法列表
	 */
	methods: {
		/**
		 * 动态绘制
		 * color 环形底色
		 * selColor 环形选中色
		 * num 步数
		 */
		draw (drawDatas) {
			const ctx = wx.createCanvasContext('myCanvas',this);
			let chartMaxRadius = this.data.chartMaxRadius;
			drawDatas.map((drawData) => {
				let annuluData = drawData;
				annuluData.radiusOuter = chartMaxRadius;
				annuluData.radiusInner = chartMaxRadius - this.data.chartAnnulusWidth;
				chartMaxRadius = annuluData.radiusInner;
				this.drawSingleAnnulus(annuluData, ctx);
				// console.log(chartMaxRadius);
			});
			ctx.draw();
			// console.log('draw')
		},
		drawSingleAnnulus (item, ctx) {
			let cell = this.data.cell;
			let radiusOuter = item.radiusOuter * cell;  // 外圆半径
			let radiusInner = item.radiusInner * cell; //内圆半径
			let x = 375 * cell; //中心点x
			let y = 300 * cell; //中心点y
			let basicRadius = item.basicNum * this.data.radiusCell;
			let extensionRadius = item.extensionNum * this.data.radiusCell;
			let basicColor = item.basic;
			let extensionColor = item.extension;
			let annulus = { cell, radiusOuter, radiusInner, x, y };
			ctx.beginPath();
			ctx.arc(annulus.x, annulus.y, annulus.radiusOuter, 0, basicRadius);
			ctx.arc(annulus.x, annulus.y, annulus.radiusInner, basicRadius, 0, true);
			ctx.setFillStyle(basicColor);
			ctx.setLineWidth(this.data.chartStrokeStyle.width);
			ctx.setStrokeStyle(this.data.chartStrokeStyle.color);
			ctx.fill();
			ctx.stroke();
			
			ctx.beginPath();
			ctx.arc(annulus.x, annulus.y, annulus.radiusOuter, basicRadius, basicRadius + extensionRadius);
			ctx.arc(annulus.x, annulus.y, annulus.radiusInner, basicRadius + extensionRadius, basicRadius, true);
			ctx.setLineWidth(this.data.chartStrokeStyle.width);
			ctx.setStrokeStyle(this.data.chartStrokeStyle.color);
			ctx.setFillStyle(extensionColor);
			ctx.fill();
			ctx.stroke();
			
			ctx.beginPath();
			ctx.arc(annulus.x, annulus.y, annulus.radiusOuter, 0, 2 * Math.PI);
			ctx.setLineWidth(this.data.chartStrokeStyle.width);
			ctx.setStrokeStyle(this.data.chartStrokeStyle.color);
			ctx.stroke();
		},
	}
});
