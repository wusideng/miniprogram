import { getOriginalList } from '../../../utils/getFiles';

Page({

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
  
  },

  onShow: function () {
    this.setData({
      originalList: getOriginalList()
    })
    console.log('originalList', this.data.originalList)
  },
  turnTo:function(){
    wx.switchTab({ url:'/pages/index/index' });
  }
})