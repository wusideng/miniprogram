// pages/ApiExample/share/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareImg:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3284671092,2250725070&fm=58&w=200&h=200&img.JPG'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage (res) {
    console.log(res);
    return{
      title:'自己的小程序',
      // path:'pages/index/index',
      imageUrl: this.data.shareImg,
      success:function(res){
        console.log('success:',res)
      },
      fail:function(res){
        console.log('fail:',res)
      }
    }
  }
})