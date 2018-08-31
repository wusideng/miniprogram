const app = getApp();
Page({
	
	/**
	 * 页面的初始数据
	 */
	data: {
		// canvasW: app.globalData.screenWidth
	},
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// this.drawBall();
		// this.interval = setInterval(this.drawBall, 17)
		this.drawTest();
	},
	
	drawCircle () {
		var rpc = wx.getSystemInfoSync();
		let cell = rpc.screenWidth / 750;
		const ctx = wx.createCanvasContext('canvas2');
		// Draw coordinates
		ctx.arc(250 * cell, 250 * cell, 250 * cell, 0, 2 * Math.PI);
		ctx.setFillStyle('#EEEEEE');
		ctx.fill();
		ctx.setStrokeStyle('#888888');
		ctx.stroke();
		ctx.draw();
	},
	
	drawTest: function () {
		const ctx = wx.createCanvasContext('canvas2');
		ctx.setFillStyle('red');
		ctx.fillRect(10, 10, 150, 75);
		ctx.draw();
	},
	
	drawBall: function () {
		var p = this.position;
		p.x += p.vx;
		p.y += p.vy;
		if (p.x >= 300) {
			p.vx = -2;
		}
		if (p.x <= 7) {
			p.vx = 2;
		}
		if (p.y >= 300) {
			p.vy = -2;
		}
		if (p.y <= 7) {
			p.vy = 2;
		}
		
		var context = wx.createContext();
		
		function ball (x, y) {
			context.beginPath(0);
			context.arc(x, y, 5, 0, Math.PI * 2);
			context.setFillStyle('#1aad19');
			context.setStrokeStyle('rgba(1,1,1,0)');
			context.fill();
			context.stroke();
		}
		
		ball(p.x, 150);
		ball(150, p.y);
		ball(300 - p.x, 150);
		ball(150, 300 - p.y);
		ball(p.x, p.y);
		ball(300 - p.x, 300 - p.y);
		ball(p.x, 300 - p.y);
		ball(300 - p.x, p.y);
		
		wx.drawCanvas({
			canvasId: 'canvasid',
			actions: context.getActions()
		});
	}
});