Page({
	
	/**
	 * 页面的初始数据
	 */
	data: {
		showModal: false,
		showActionSheet:false
	},
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad (options) {
	
	},
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow () {
	
	},
	bindBtnShowModal(){
		this.setData({
			showModal:true
		})
	},
	bindModelEvent () {
		this.setData({
			showModal: false
		})
	},
	bindBtnShowActionSheet(){
		wx.showActionSheet({
			itemList: ['退出登录'],
			success: function(res) {
				console.log(res.tapIndex)
			},
			fail: function(res) {
				console.log(res.errMsg)
			}
		})
	},
	bindActionSuccess(e){
		console.log(e)
	},
	bindBtnShowActionSheetComponent(){
		this.setData({
			showActionSheet:true
		})
	},
	bindActionSheetCancel(){
		this.setData({
			showActionSheet:false
		})
	},
  bindShowToast(){
    wx.showToast({ icon: 'none'/* error */, title: '网络繁忙，请稍后重试NetWork', duration: 3000 });
  },
  bindShowToastAndLoading(){
    wx.hideLoading();
    setTimeout(function(){
      wx.showToast({ icon: 'none'/* error */, title: '网络繁忙，请稍后重试NetWork', duration: 3000 });
    },300)
  },
  bindShowLoading(){
    wx.showLoading();
  },
  bindHideLoading(){
    wx.hideLoading();
  }
});