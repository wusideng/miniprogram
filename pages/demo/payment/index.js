// pages/demo/payment/index.js
Page({
	
	/**
	 * 页面的初始数据
	 */
	data: {},
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad (options) {
	
	},
	btnPayment () {
		const timeStamp = new Date().getTime();
		const nonceStr = Math.random();
		const requestPackage = '成功了么？';
		const signType = '签名';
		const paySign = '';
		wx.requestPayment({
			timeStamp,
			nonceStr,
			requestPackage,
			signType,
			paySign,
			success:(res)=>{
				console.log('支付',res);
			}
		});
	}
});