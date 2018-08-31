// pages/plot/createCanvasContext/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cell: app.globalData.screenWidth / 750
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.draw();
    this.draw1();
    this.draw2();
    this.draw3();
    this.draw4();
  },
  draw4() {
    this.radian4 = 0;
    this.cutAnnulus();
    this.interval4 = setInterval(this.cutAnnulus, 17);
  },
  /**
   * 有间隔的环
   * cutNum 间隔数
   * color 间隔颜色
   */
  cutAnnulus(cutNum) {
    if (this.radian4 < 2 * Math.PI) this.radian4 += 0.017;
    else {
      this.radian4 = 2 * Math.PI;
      clearInterval(this.interval4)
    }
    let cell = this.data.cell;
    const ctx = wx.createCanvasContext('myCanvas4');
    ctx.beginPath();
    ctx.arc(375 * cell, 200 * cell, 200 * cell, 0, this.radian4);
    ctx.arc(375 * cell, 200 * cell, 150 * cell, this.radian4, 0, true);
    ctx.setFillStyle('yellow');
    ctx.fill();
    if (this.radian4 > Math.PI / 2 * 0)
      this.cuts(ctx, 0, this.radian4);
    if (this.radian4 > Math.PI / 2 * 1 - 0.1)
      this.cuts(ctx, 1, this.radian4);
    if (this.radian4 > Math.PI / 2 * 2 - 0.1)
      this.cuts(ctx, 2, this.radian4);
    if (this.radian4 > Math.PI / 2 * 3 - 0.1)
      this.cuts(ctx, 3, this.radian4);
    ctx.draw();
  },
  cuts(ctx, cutNum, curRadian) {
    let cell = this.data.cell;
    ctx.beginPath();
    if (curRadian > Math.PI * 2 / 4 * cutNum - 0.1 && curRadian < Math.PI * 2 / 4 * cutNum + 0.1){
      ctx.arc(375 * cell, 200 * cell, 200 * cell, Math.PI * 2 / 4 * cutNum - 0.1, curRadian);
      ctx.arc(375 * cell, 200 * cell, 150 * cell, curRadian, Math.PI * 2 / 4 * cutNum - 0.1, true);
      ctx.setFillStyle('white');
      ctx.fill();
    } else if (curRadian > Math.PI * 2 / 4 * cutNum + 0.1){
      ctx.arc(375 * cell, 200 * cell, 200 * cell, Math.PI * 2 / 4 * cutNum - 0.1, Math.PI * 2 / 4 * cutNum + 0.1);
      ctx.arc(375 * cell, 200 * cell, 150 * cell, Math.PI * 2 / 4 * cutNum + 0.1, Math.PI * 2 / 4 * cutNum - 0.1, true);
      ctx.setFillStyle('white');
      ctx.fill();
    }
  },
  draw3() {
    this.radian3 = 1;
    this.annulus()
    this.interval3 = setInterval(this.annulus, 17);
  },
  /**
   * 环形
   * x,y 中心点坐标
   * thickness 环形厚度
   * radian 外环半径
   */
  annulus() {
    if (this.radian3 < 2 * Math.PI) this.radian3 += 0.017;
    else {
      this.radian3 = 2 * Math.PI;
      clearInterval(this.interval3)
    }
    let cell = this.data.cell;
    const ctx = wx.createCanvasContext('myCanvas3');
    ctx.beginPath()
    ctx.arc(375 * cell, 200 * cell, 200 * cell, 0, this.radian3);
    ctx.arc(375 * cell, 200 * cell, 150 * cell, this.radian3, 0, true);
    ctx.setFillStyle('blue')
    ctx.fill()
    ctx.draw()
  },
  draw2() {
    this.radian = 0;
    this.drawSector();
    this.interval = setInterval(this.drawSector, 17);
  },
  /**
   * 扇形
   */
  drawSector() {
    console.log('darwCircle')
    if (this.radian < 2 * Math.PI) this.radian += 0.017;
    else {
      this.radian = 2 * Math.PI;
      clearInterval(this.interval)
    }
    let cell = this.data.cell;
    const ctx = wx.createCanvasContext('myCanvas2');
    // ctx.setFillStyle('#EEEEEE')
    // ctx.fill()
    ctx.beginPath()
    ctx.moveTo(375 * cell, 200 * cell);
    ctx.lineTo(575 * cell, 200 * cell)
    ctx.arc(375 * cell, 200 * cell, 200 * cell, 0, this.radian)
    ctx.setFillStyle('lightgreen')
    ctx.fill()
    ctx.draw()
  },
  draw1() {
    this.position = {
      x: 150,
      y: 150,
      vx: 2,
      vy: 2
    }
    this.drawBall()
    this.interval = setInterval(this.drawBall, 17)
  },
  draw() {
    // 使用 wx.createContext 获取绘图上下文 context
    var context = wx.createCanvasContext('myCanvas')
    context.setStrokeStyle("#00ff00")
    context.setLineWidth(5)
    context.rect(0, 0, 200, 200)
    context.stroke()
    context.setStrokeStyle("#ff0000")
    context.setLineWidth(2)
    context.moveTo(160, 100)
    context.arc(100, 100, 60, 0, 2 * Math.PI, true)
    context.moveTo(140, 100)
    context.arc(100, 100, 40, 0, Math.PI, false)
    context.moveTo(85, 80)
    context.arc(80, 80, 5, 0, 2 * Math.PI, true)
    context.moveTo(125, 80)
    context.arc(120, 80, 5, 0, 2 * Math.PI, true)
    context.stroke()
    context.draw()
  },
  drawBall: function () {
    var p = this.position
    // console.log('p',p)
    p.x += p.vx
    p.y += p.vy
    if (p.x >= 300) {
      p.vx = -2
    }
    if (p.x <= 7) {
      p.vx = 2
    }
    if (p.y >= 300) {
      p.vy = -2
    }
    if (p.y <= 7) {
      p.vy = 2
    }

    var context = wx.createContext()

    function ball(x, y) {
      context.beginPath(0)
      context.arc(x, y, 5, 0, Math.PI * 2)
      context.setFillStyle('#1aad19')
      context.setStrokeStyle('rgba(1,1,1,0)')
      context.fill()
      context.stroke()
    }

    ball(p.x, 150)
    ball(150, p.y)
    ball(300 - p.x, 150)
    ball(150, 300 - p.y)
    ball(p.x, p.y)
    ball(300 - p.x, 300 - p.y)
    ball(p.x, 300 - p.y)
    ball(300 - p.x, p.y)

    wx.drawCanvas({
      canvasId: 'myCanvas1',
      actions: context.getActions()
    })
  },
  onUnload: function () {
    clearInterval(this.interval)
  }
})