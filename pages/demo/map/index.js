import { util } from '../../../utils/util';

const positionIcon = 'data:image/png;base64,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';
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		width: 0,
		height: 0,
		longitude: 113.324520,
		latitude: 23.099994,
		scale: 14,
		markers: [],
		polyline: [],
		isShowDataBox:false
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad (options) {
		this.setData({
			width: util.getWindowH(),
			height: util.getScreenH()
		});
	},
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow () {
	
	},
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage () {
	
	},
	/**
	 * 创建地图
	 */
	createMap () {
		wx.createMapContext();
	},
	/**
	 * 地图改变状态时触发
	 */
	bindRegionChange (e) {
		// console.log('bindRegionChange', e);
		
	},
	/**
	 * 地图点击触发
	 * @param e
	 */
	bindMapClick (e) {
	
	},
	/**
	 * 定位到当前位置
	 */
	bindToPosition () {
		util.getLocation().then(res => {
			this.setData({
				longitude: res.longitude,
				latitude: res.latitude
			});
			console.log('bindRegionChange_map:', res);
		});
	},
	/**
	 * 添加标记点
	 */
	addMarks (title, label, lon, lat) {
		let markers = this.data.markers;
		let iconPath = positionIcon;
		let callout = this.addCallout(`${title},${label}`);
		let labelC = this.addLabel(0, 0, label);
		let marker = {
			id: 0,
			width: 20,
			height: 20,
			alpha: 0.6,
			title: title,
			label: labelC,
			latitude: lat,
			longitude: lon,
			iconPath: iconPath,
			callout: callout
		};
		markers.push(marker);
		this.setData({
			markers
		});
	},
	/**
	 * 弹出窗口
	 */
	addCallout (label) {
		let callout = {
			content: label,
			color: '#841',
			fontSize: '',
			borderRadius: 10,
			bgColor: '#fff',
			padding: 10,
			display: 'BYCLICK',
			textAlign: 'left'
		};
		return callout;
	},
	/**
	 * 添加label
	 */
	addLabel (lon, lat, label) {
		let labelC = {
			content: label,
			color: '#888888',
			fontSize: 10,
			anchorX: lon,
			anchorY: lat,
			borderWidth: 1,
			borderColor: '#458',
			borderRadius: 10,
			bgColor: '#fff',
			textAlign: 'left'
		};
		return labelC;
	},
	/**
	 * 添加轨迹
	 */
	addLines () {
		//polyline
	},
	/**
	 * 放大
	 */
	bindZoomOut () {
		let scale = this.data.scale + 1;
		this.setData({
			scale
		});
	},
	/**
	 * 缩小
	 */
	bindZoomIn () {
		let scale = this.data.scale - 1;
		this.setData({
			scale
		});  
	},
	/**
	 * 添加测试点位
	 */
	addRandomMarkers () {
		let random1 = Math.random();
		let random2 = Math.random();
		let lon = this.data.longitude + random1 / 50;
		let lat = this.data.latitude + random2 / 50;
		let title = '监测点位' + random1.toFixed(4);
		let label = '治安良好' + random1.toFixed(4);
		this.addMarks(title, label, lon, lat);
	},
	/**
	 * 随机轨迹添加
	 */
	addRandomLine () {
		let random1 = Math.random();
	},
	clearMap () {
		this.setData({
			markers: []
		});
	}
	/**
	 * Animation Show
	 */
	
});