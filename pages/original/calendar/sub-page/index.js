import regeneratorRuntime from '../../../../assets/js/runtime';
import { util } from '../../../../utils/util';

const app = getApp();
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		memoryDateTip: '',
		selectTip: '',
		today: '',
		remindCycle: '',
		remindCycleArr: ['仅一次', '每周', '每月', '每6个月', '每年'],
		addFlagTab: false,
		newTagName: ''
	},
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.initTime();
		this.initProfessionData();
	},
	onShow () {
		this.setData({
			addFlagTab: false
		});
	},
	initTime () {
		const date = new Date()
			, month = date.getMonth() + 1
			, year = date.getFullYear()
			, day = date.getDate()
			, today = `${year}-${month}-${day}`;
		this.setData({
			today: today
		});
	},
	initProfessionData () {
		if (!app.globalData.calendar)
			app.globalData.calendar = {
				'tip': [
					{ name: '计划投资日', id: '1', color: '#ff0000' },
					{ name: '到期日', id: '1', color: '#00ff00' },
					{ name: '发薪日', id: '1', color: '#0000ff' },
					{ name: '信用卡还款日', id: '1', color: '#ffff00' },
					{ name: '水电费缴纳日', id: '1', color: '#00ffff' },
					{ name: '定存宝理财到期，转无忧宝', id: '1', color: '#077770' }
				]
			};
		this.setData({
			memoryDateTip: app.globalData.calendar.tip
		});
	},
	bindSelectTip (e) {
		this.setData({
			selectTip: e.currentTarget.dataset.tip.name
		});
	},
	bindChangeDate (e) {
		if (e.detail.value === this.data.today)
			return;
		this.setData({
			today: e.detail.value
		});
	},
	bindChangeFrequency () {
		if (e.detail.value === this.data.remindCycle)
			return;
		this.setData({
			remindCycle: e.detail.value
		});
	},
	async bindAddRemind () {
		if (this.data.selectTip === '') {
			util.showToast('没有选择类别');
			return; //没有选择类别
		}
		if (!util.getStorageSync('remind')) util.setStorageSync({ key: 'remind', data: [] });
		let remind = util.getStorageSync('remind');
		remind.push({
			memoryDateTip: this.data.memoryDateTip,
			selectTip: this.data.selectTip,
			today: this.data.today,
			remindCycle: this.data.remindCycle
		});
		await util.setStorage({ key: 'remind', data: remind });
		setTimeout(function () {
			console.log('sub-page-remind_time:', util.getStorageSync('remind'));
		}, 1000);
		wx.navigateTo({ url: '../index' });
	},
	bindAddTagFlag () {
		let addFlagTab = this.data.addFlagTab;
		this.setData({
			addFlagTab: !addFlagTab
		});
	},
	bindAddTag (e) {
		if (this.data.newTagName.trim() === '') {
			util.showToast('没有填写签名')
			return;
		}
		let id = new Date().valueOf();
		app.globalData.calendar.tip.push({ name: this.data.newTagName, id: id, color: util.getRandomColor() });
		this.setData({
			memoryDateTip: app.globalData.calendar.tip,
			newTagName: ''
		});
	},
	bindTapName (e) {
		this.setData({
			newTagName: e.detail.value
		});
	}
});