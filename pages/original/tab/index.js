// pages/original/tab/index.js
import regeneratorRuntime from '../../../assets/js/runtime';

Page({
	
	/**
	 * 页面的初始数据
	 */
	data: {
		list1: ['账户余额', '账户总资产', '累计期待回报'],
		list2: ['持有中', '已结束', '已转让', '累计出借'],
		list3: [
			{ 'img': '../../assets/img/worth-calc/profit-calc.png', 'title': '回报计算器', 'subtitle': '算算能赚多少钱', 'url': './index' },
			{ 'img': '../../assets/img/worth-calc/auto-invest.png', 'title': '自动出售', 'subtitle': '省心省力快速出借', 'url': './index' },
			{ 'img': '../../assets/img/worth-calc/worth-calc.png', 'title': '身价计算器', 'subtitle': '你也能成为大富翁', 'url': './index' }],
		activeIndex1: 0,
		activeIndex2: 0,
		isExpand: false,
		animationData: {},
		animationData1: {},
		system: {},
		checkboxItems: [
			{ name: '我的资产信息问题', value: 'a', checked: true },
			{ name: '注册及银行开户', value: 'b', checked: true },
			{ name: '产品规则描述', value: 'a', checked: true },
			{ name: '充值/预约出借/提现', value: 'a', checked: true },
			{ name: '红包、特权本金使用问题', value: 'a', checked: true },
			{ name: '近期奖励活动问题', value: 'a', checked: true },
			{ name: '其他', value: 'a', checked: true }
		],
		radipoItem:[
			{name: 'USA', value: '美国'},
			{name: 'CHN', value: '中国', checked: 'true'},
			{name: 'BRA', value: '巴西'}
		],
		textareaMsg:'删除时光标会跳到最后'
	},
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
	
	},
	
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
	
	},
	
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
	
	},
	onTabChange1: function (event) {
		if (event.detail.activeIndex === this.data.activeIndex1) return;
		this.animation();
		this.setData({
			activeIndex1: event.detail.activeIndex
		});
	},
	onTabChange2: function (event) {
		this.animation1();
		this.setData({
			activeIndex2: event.detail.activeIndex
		});
	},
	onTabChange3: function (event) {
		console.log('onTabChange3:', event);
		this.setData({
			isExpand: event.detail
		});
	},
	selectTab2: function (event) {
		this.setData({
			activeIndex2: 1
		});
	},
	selectTab1: function (event) {
		this.setData({
			activeIndex1: 2
		});
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
	async animation () {
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
		animationHide.translateY(windowH).step();
		this.setData({
			animationData: animationHide.export()
		});
		setTimeout(function () {
			animationShow.translate(0, 0).step();
			this.setData({
				animationData: animationShow.export()
			});
		}.bind(this), 500);
	},
	async animation1 () {
		if (!this.data.system.windowHeight)
			await this.getSystemInfo();
		let animation = wx.createAnimation({
			duration: 1000,
			timingFunction: 'ease',
			bottom: 0
		});
		let windowH = this.data.system.windowHeight;
		animation.translateY(windowH).step();
		this.setData({
			animationData1: animation.export()
		});
		setTimeout(function () {
			animation.translate(0, -windowH).step();
			this.setData({
				animationData1: animation.export()
			});
		}.bind(this), 500);
	}
});