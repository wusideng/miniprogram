// pages/demo/phone/index.js
Page({

	/**
	 * 页面的初始数据
	 */
  data: {},

	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad(options) {

  },
	/**
	 * 拨打电话号码
	 */
  bindPhoneCall(event) {
    console.log(event.currentTarget.dataset.phonenum);
    const phoneNum = event.currentTarget.dataset.phonenum;
    wx.makePhoneCall({
      phoneNumber: phoneNum //仅为示例，并非真实的电话号码
    });
  },
	/**
	 * 扫码
	 */
  bindScanCode() {
    wx.scanCode({
      onlyFromCamera: false,
      success: (res) => {
        console.log(res);
      }
    });
  },
	/**
	 * 获取剪切板数据
	 */
  setClipBoardData() {
    data: 'data'
  }
});