const formatTime = date => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();
	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

const formatNumber = n => {
	n = n.toString();
	return n[1] ? n : '0' + n;
};

const setStorage = (item = { key: 'key', data: 'data' }) => {
	return new Promise(function (resolve, reject) {
		wx.setStorage({
			key: item.key,
			data: item.data,
			success: function (e) {
				e.type = 'promise success';
				resolve(e);
			},
			fail: function (e) {
				e.type = 'promise fail';
				reject(e);
			},
			complete: function () {
			
			}
		});
	});
};

const setStorageSync = (item = { key: '', data: '' }) => {
	wx.setStorageSync(item.key, item.data);
};

const getStorage = (key = '') => {
	return new Promise(function (resolve, reject) {
		wx.getStorage({
			key: key,
			success: function (e) {
				e.type = 'getStorage_Promise success';
				resolve(e);
			},
			fail: function (e) {
				e.type = 'getStorage_Promise fail';
				reject(e);
			},
			complete: function () {
			
			}
		});
	});
};

const getStorageSync = (key = '') => {
	return wx.getStorageSync(key);
};

const getRandomColor = () => {
	let colorArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
	let color = '';
	for (let i = 0; i < 6; i++) {
		color += colorArr[Math.floor(Math.random() * 15)];
	}
	return '#' + color;
};

const showToast = (msg, duration = 1000) => {
	wx.showToast({
		title: msg,
		icon: 'none',
		duration: duration,
		mask: true
	});
};
/**
 * 兼容获取ScreenHeight-statusBarHeight
 */
const getScreenH = () => {
	let systemInfo = wx.getSystemInfoSync();
	let screenHeight = 0;
	let coefficient = 375 / systemInfo.screenWidth;  //屏幕正常宽度取值 375 通过宽度异常计算高度偏差
	screenHeight = (systemInfo.screenHeight - systemInfo.statusBarHeight * systemInfo.pixelRatio) * 2 * coefficient;
	return screenHeight;
};
/**
 * 兼容获取windowHeight
 * 不同机型会存在页面获取高度错误，如果没有取到正确值，则通过计算获得窗口高度
 */
const getWindowH = () => {
	let systemInfo = wx.getSystemInfoSync();
	let windowHeight = 0;
	let coefficient = 375 / systemInfo.screenWidth;  //屏幕正常宽度取值 375 通过宽度异常计算高度偏差
	windowHeight = systemInfo.windowHeight * 2 * coefficient;
	return windowHeight;
};

const getLocation = () => {
	return new Promise(function (resolve, reject) {
		wx.getLocation({
			type: 'wgs84',
			success: function (res) {
				resolve(res);
			},
			fail: function (res) {
				reject(res);
			},
			complete: function (res) {
				resolve(res);
			}
		});
	});
};

exports.util = {
	formatTime,
	setStorage,
	setStorageSync,
	getStorage,
	getStorageSync,
	getRandomColor,
	showToast,
	getScreenH,
	getWindowH,
	getLocation
	
};
