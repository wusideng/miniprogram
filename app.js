//app.js
App({
	globalData: {
		userInfo: null,
		screenWidth: 0
	},
	onLaunch: function () {
		this.updateVersion();
		this.getStorageDemo();
		this.login();
		// 获取用户信息
		wx.getSetting({
			success: res => {
				if (res.authSetting['scope.userInfo']) {
				
				}
			}
		});
	},
	updateVersion () {
		const updateManager = wx.getUpdateManager();
		updateManager.onCheckForUpdate(function (res) {
			// 请求完新版本信息的回调
			console.log('线上存在新版本小程序：', res.hasUpdate);
		});
		updateManager.onUpdateReady(function () {
			updateManager.applyUpdate();
		});
		updateManager.onUpdateFailed(function () {
			// 新的版本下载失败
			console.log('新版本小程序下载失败');
		});
	},
	getStorageDemo () {
		// 展示本地存储能力
		var logs = wx.getStorageSync('logs') || [];
		logs.unshift(Date.now());
		wx.setStorageSync('logs', logs);
	},
	login () {
		// 登录
		wx.login({
			success: res => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
			}
		});
	},
	getSystemInfo () {
		wx.getSystemInfo({
			success: res => {
				this.globalData.screenWidth = res.screenWidth;
			}
		});
	}
});