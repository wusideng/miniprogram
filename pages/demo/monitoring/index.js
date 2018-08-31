import regeneratorRuntime from '../../../assets/js/runtime';
import { http } from '../../../service/http.service';

Page({
	
	/**
	 * 页面的初始数据
	 */
	data: {
		order_id: '',
		order_name: '',
		order_time: 0
	},
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad (options) {
	
	},
	
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady () {
	
	},
	
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow () {
	
	},
	
	bindOrder () {
		wx.reportAnalytics('bind_order', {
			ordername: '预约订单',
			ordertime: new Date().getTime(),
			orderid: 'myorder'
		});
		console.log(this.data);
	},
	/**
	 * 获取哦用户统计数据  概况趋势
	 */
	async getMonitoring (event) {
		const getToken = await this.getToken();
		const token = getToken.data.access_token;
		let path = '';
		switch (event.currentTarget.dataset.type) {
			case 'gkqs':
				path = 'getweanalysisappiddailysummarytrend';
				break;
			case 'fwqs':
				path = 'getweanalysisappiddailyvisittrend';
				break;
			case 'fwfb':
				path = 'getweanalysisappidvisitdistribution';
				break;
			case 'fwlc':
				path = 'getweanalysisappiddailyretaininfo';
				break;
			case 'fwym':
				path = 'getweanalysisappidvisitpage';
				break;
		}
		const url = `https://api.weixin.qq.com/datacube/${path}?access_token=${token}`;
		const param = {
			'begin_date': '20180524',
			'end_date': '20180524'
		};
		http.post(url, param).then((res) => {
			console.log('http.post:', res);
		});
	},
	/**
	 * 获取哦用户统计数据  访问趋势
	 */
	async getMonitoringFWQSI () {
		const getToken = await this.getToken();
		const token = getToken.data.access_token;
		const url = 'https://api.weixin.qq.com/datacube/getweanalysisappiddailyvisittrend?access_token=' + token;
		const param = {
			'begin_date': '20180524',
			'end_date': '20180524'
		};
		http.post(url, param).then((res) => {
			console.log('http.post:', res);
		});
	},
	/**
	 * 获取token
	 */
	getToken () {
		const url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&';
		const param = {
			appid: 'wxd8b26f08f2550ad5',
			secret: '690399e631899a666300be07c775da43'
		};
		return http.get(url, param);
	}
});