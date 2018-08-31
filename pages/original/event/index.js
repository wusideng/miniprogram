/* ===================================
 * 郭海东 测试button 绑定事件混论
 * 混乱问题分析 position
 * Created by Wangcj on 2018/04/11.
 * Copyright 2018 yooli, Inc.
 * =================================== */
import common from '../../../utils/common.js';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		click1msg: 'event',
		appData: 'wechat',
		last: 0
	},
	launchAppError: function (e) {
		console.log('launchAppError:', e.detail.errMsg, e);
		common.downloadApp(1);
	},
	selectBtnCell1 (event) {
		this.setData({
			click1msg: event.currentTarget.dataset.btn + ':点击了'
		});
		console.log('selectBtn', event.currentTarget.dataset);
	},
	selectTxtCell1 (event) {
		console.log('selectTxt', event.currentTarget.dataset);
	},
	selectBtnCell2 (event) {
		console.log('selectBtn:', event.currentTarget.dataset);
	},
	selecdtTxtCell2 (event) {
		console.log('selectTxt', event.currentTarget.dataset);
	},
	bindBtnClick (e) {
		console.log('普通点击');
	},
	bindThrottleClick (e) {
		// console.log('Throttle点击');
		this.throttle(1000, function () {console.log('Throttle点击');})();
	},
	throttle (delay, action) {
		return function () {
			var curr = +new Date();
			console.log(curr, this.data.last, curr - this.data.last);
			if (curr - this.data.last > delay) {
				action.apply(this, arguments);
				this.data.last = curr;
			}
		}.bind(this);
	}
});