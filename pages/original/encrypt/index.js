// pages/original/encrypt/index.js
import { crypt } from '../../../utils/crypt';

Page({
	
	/**
	 * 页面的初始数据
	 */
	data: {
		key:'',
		value:'',
		encrypt:''
	},
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad (options) {
		this.getEncrypt();
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
	//0b561206f1092423fe4ac84dcd587e86
	getEncrypt () {
		this.setData({
			key:'abc',
			value:'123'
		})
		this.setData({
			encrypt:crypt.encrypt(this.data.key,this.data.value)
		})
	}
});