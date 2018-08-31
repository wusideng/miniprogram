import { getDemoList } from '../../utils/getFiles';

const Obj = {
	
	/**
	 * 页面的初始数据
	 */
	data: {
		originalList: []
	},
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log('onLoad');
	},
	
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.setData({
			originalList: getDemoList()
		});
		console.log('originalList', this.data.originalList);
	}
};


Page(Obj);