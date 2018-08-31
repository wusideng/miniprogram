Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		visable: {
			type: Boolean,
			value: false
		},
		title: {
			type: String,
			value: '退出登录后将不能收到有利网消息推送。'
		},
		listItem: {
			type: Array,
			value: ['确定', '确定1', '确定2', '确定3']
		}
	},
	
	/**
	 * 组件的初始数据
	 */
	data: {
		animationData: {},
		animationMask: {}
	},
	
	created () {
		console.log('created');
	},
	ready () {
		console.log('ready');
		this.setData({
			visable: true
		});
		this.animation();
	},
	detached () {
		console.log('detached');
	},
	/**
	 * 组件的方法列表
	 */
	methods: {
		animation () {
			console.log('animation');
			let animationHide = wx.createAnimation({
				duration: 0,
				timingFunction: 'ease',
			});
			let animationShow = wx.createAnimation({
				duration: 500,
				timingFunction: 'ease',
			});
			let animationMaskHide = wx.createAnimation({
				duration: 0,
				timingFunction: 'ease',
			});
			let animationMaskShow = wx.createAnimation({
				duration: 300,
				timingFunction: 'ease-out',
			});
			let windowH = wx.getSystemInfoSync().windowHeight;
			animationHide.translateY(windowH).step();
			animationMaskHide.opacity(0).step();
			this.setData({
				animationData: animationHide.export(),
				animationMask: animationMaskHide.export()
			});
			setTimeout(function () {
				animationShow.translate(0, 0).step();
				animationMaskShow.opacity(0.5).step();
				this.setData({
					animationData: animationShow.export(),
					animationMask:animationMaskShow.export()
				});
			}.bind(this), 500);
		},
		animationHide(){
			let animationHide = wx.createAnimation({
				duration: 500,
				timingFunction: 'ease',
			});
			let animationMaskHide = wx.createAnimation({
				duration: 300,
				timingFunction: 'ease-out',
			});
			let windowH = wx.getSystemInfoSync().windowHeight;
			animationHide.translateY(windowH).step();
			animationMaskHide.opacity(0).step();
			this.setData({
				animationData: animationHide.export(),
				animationMask: animationMaskHide.export()
			});
		},
		actionEvent (e) {
			this.triggerEvent('success', e.currentTarget.dataset, 'myCancelEvent');
		},
		cancelEvent (e) {
			this.animationHide();
			setTimeout(function () {
				this.triggerEvent('cancelEvent', 'cancel', 'myCancelEvent');
			}.bind(this),1000)
		}
	}
});
