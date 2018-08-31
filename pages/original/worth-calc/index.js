const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenWidth: app.globalData.screenWidth,
    celWidth: app.globalData.screenWidth / 750,
    index: 0,
    percent: 0,
    percentTest:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.draw()
  },
  draw() {
    let cell = this.data.celWidth
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.drawImage("/assets/img/worth-cacl/circle.png", 282 * this.data.index, 0, 282, 282, 125 * cell, 0, 500 * cell, 500 * cell)
    ctx.setFontSize(15)
    ctx.setTextAlign('center')
    ctx.fillText('当前身价(元)', 375 * cell, 200 * cell, 500 * cell)
    ctx.setFontSize(38)
    ctx.fillText('0', 375 * cell, 300 * cell, 500 * cell)
    ctx.draw();
    let index = this.data.index < 4 ? this.data.index + 1 : 0;
    this.setData({
      index: index
    })
  },
  progressing(startPer, reachPer = 100) {
    if (startPer===100){startPer=0;reachPer=25;}
    if (startPer < reachPer) {
      startPer++;
      setTimeout(() => {
        this.setData({
          percent: startPer
        })
        this.progressing(startPer, reachPer);
      }, 30)
    }
  },
  btnNext() {
    this.draw()
    this.progressing(this.data.percent, this.data.percent+25)

    this.setData({
      percentTest:100
    })
  }
})