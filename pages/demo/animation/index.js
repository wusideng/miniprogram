// pages/original/tab/index.js
``

Page({
	data: {
		animationData: {},
		animationData1: {}
	},
	onShow: function () {
		var animation = wx.createAnimation({
			duration: 1000,
			timingFunction: 'ease'
		});
		
		this.animation = animation;
		
		// animation.scale(2, 2).rotate(45).step();
		//
		// this.setData({
		// 	animationData: animation.export()
		// });
		//
		// setTimeout(function () {
		// 	animation.translate(30).step();
		// 	this.setData({
		// 		animationData: animation.export()
		// 	});
		// }.bind(this), 1000);
		this.rotateAndScale();
		this.rotateThenScale();
		this.rotateAndScaleThenTranslate();
	},
	async bindAnimation () {
		await this.getSystemInfo();
		let animationHide = wx.createAnimation({
			duration: 0,
			timingFunction: 'ease',
			bottom: 0
		});
		let animationShow = wx.createAnimation({
			duration: 1000,
			timingFunction: 'ease',
			bottom: 0
		});
		let windowH = this.data.system.windowHeight;
		animationHide.translateY(500).step();
		this.setData({
			animationData1: animationHide.export()
		});
		setTimeout(function () {
			animationShow.translate(0, 0).step();
			this.setData({
				animationData1: animationShow.export()
			});
		}.bind(this), 500);
	},
	getSystemInfo () {
		return new Promise((resolve, reject) => {
			wx.getSystemInfo({
				success: (res) => {
					console.log(res);
					this.setData({
						system: res
					});
					return resolve('sucess');
				}
			});
		});
	},
	rotateAndScale: function () {
		// 旋转同时放大
		this.animation.rotate(45).scale(2, 2).step();
		this.setData({
			animationData: this.animation.export()
		});
	},
	rotateThenScale: function () {
		// 先旋转后放大
		this.animation.rotate(45).step();
		this.animation.scale(2, 2).step();
		this.setData({
			animationData: this.animation.export()
		});
	},
	rotateAndScaleThenTranslate: function () {
		// 先旋转同时放大，然后平移
		this.animation.rotate(45).scale(2, 2).step();
		this.animation.translate(100, 100).step({ duration: 1000 });
		this.setData({
			animationData: this.animation.export()
		});
	}
});