// pages/demo/input/index.js
Page({
	
	/**
	 * 页面的初始数据
	 */
	data: {
		phone: '',
		phone2: '',
		inputholder: false,
		noRefreshInputholder: false,
		animationData: {}
	},
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad (options) {
	
	},
	bindPhoneInput (e) {
		let value = e.detail.value;
		console.log('bindPhoneInput_b:' + value);
		this.setData({
			phone: value.trim().replace(/\s+/g, '')
		});
		console.log('bindPhoneInput_e:' + this.data.phone);
	},
	bindPhoneInputWithHolder (e) {
		let value = e.detail.value;
		this.setData({
			phone2: value.trim().replace(/\s+/g, '')
		});
		if (this.data.phone2.trim() !== '') {
			this.setData({
				inputholder: true
			});
		} else {
			this.setData({
				inputholder: false
			});
		}
		this.jugeAnimation(e);
	},
	jugeAnimation (e) {
		let reg = new RegExp('^((13[0-9])|(14[0-9])|(15[^4,\D])|(166)|(17[0-9])|(18[0-9])|(19[8,9]))\d{8}$');
		if (this.data.noRefreshInputholder !== this.data.inputholder){
			this.data.noRefreshInputholder = this.data.inputholder;
			this.inputAnimation();
		}
		if(!reg.test(this.data.phone2) && this.data.phone2.length === 11){
			this.inputAnimation();
		}
	},
	inputAnimation () {
		var animation = wx.createAnimation({
			duration: 0,
			timingFunction: 'step-start'
		});
		animation.translateY(30).step();
		this.setData({
			animationData: animation.export()
		});
		animation = wx.createAnimation({
			duration: 500,
			timingFunction: 'ease'
		});
		setTimeout(function () {
			animation.translateY(0).step();
			this.setData({
				animationData: animation.export()
			});
		}.bind(this), 0);
	}
});