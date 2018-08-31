const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cell: app.globalData.screenWidth / 750,
    step: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.draw('#eee', 'yellow', this.data.step);
  },
  /**
   * 动态绘制
   * color 环形底色
   * selColor 环形选中色
   * num 步数
   */
  draw(color, selColor, num) {
    let cutNum = 4
    this.radian = this.data.step === 0 ? 0 : (num - 1) * Math.PI * 2 / cutNum;
    this.cutAnnulus(color, selColor, num, cutNum);
    this.interval = setInterval(() => this.cutAnnulus(color, selColor, num, cutNum), 17);
  },
  /**
   * 有间隔的环
   * color 环形颜色
   * selColor 选中颜色
   * step 步数
   * cutNum 间隔数
   * cutColor 间隔颜色
   */
  cutAnnulus(color, selColor, step, cutNum, cutColor) {
    let cell = this.data.cell;
    let radiusOuter = 200 * cell;  // 外圆半径
    let radiusInner = 150 * cell; //内圆半径
    let x = 375 * cell; //中心点x
    let y = 200 * cell; //中心点y
    let annulus = { color, cutNum, cell, radiusOuter, radiusInner, x, y } 

    console.log('cutAnnulus')
    if (this.radian < 2 * Math.PI && this.radian < step * Math.PI * 2 / cutNum) this.radian += 0.017;
    else {
      // this.radian = 2 * Math.PI;
      clearInterval(this.interval)
    }

    const ctx = wx.createCanvasContext('myCanvas');
    this.backGround(ctx, annulus);
    this.txtContent(ctx, annulus);
    ctx.beginPath();
    ctx.arc(x, y, radiusOuter, 0, this.radian);
    ctx.arc(x, y, radiusInner, this.radian, 0, true);
    ctx.setFillStyle(selColor);
    ctx.fill();

    for (let i = 0; i < cutNum; i++) {
      if (this.radian > Math.PI / 2 * 0)
        this.cuts(ctx, i, this.radian, annulus);
    }
    ctx.draw();
  },
  /**
   * 背景绘制
   * ctx
   * annulus 环形参数
   */
  backGround(ctx, annulus) {
    let cell = this.data.cell;
    let innerColor = '#dbdbdb';
    let outerColor = '#888888';
    // 环形外圈
    ctx.beginPath();
    ctx.arc(annulus.x, annulus.y, annulus.radiusOuter+50*cell, 0, 2 * Math.PI);
    ctx.setFillStyle(outerColor);
    ctx.fill();
    // 带空隙的环形
    ctx.beginPath();
    ctx.arc(annulus.x, annulus.y, annulus.radiusOuter, 0, 2 * Math.PI);
    ctx.arc(annulus.x, annulus.y, annulus.radiusInner, 2 * Math.PI, 0, true);
    ctx.setFillStyle(annulus.color);
    ctx.fill();
    for (let i = 0; i < annulus.cutNum; i++) {
      this.cuts(ctx, i, 2 * Math.PI, annulus);
    }
    // 圆底色
    ctx.beginPath();
    ctx.arc(annulus.x, annulus.y, annulus.radiusInner, 0, 2 * Math.PI);
    ctx.setFillStyle(innerColor);
    ctx.fill();
  },
  /**
   * 添加文本
   */
  txtContent(ctx, annulus){
    ctx.moveTo(annulus.x + annulus.radiusOuter, annulus.y)
    ctx.setFillStyle('red');
    ctx.setTextAlign('center')
    ctx.setFontSize(15)
    ctx.fillText('当前身价(元)', annulus.x, annulus.y - annulus.cell * 30)
    ctx.setFontSize(38)
    ctx.fillText('0', annulus.x, annulus.y + annulus.cell*60)
  },
  /**
   * 环形间隔
   * ctx
   * step 间隔序列
   * curRadian 弧度数
   */
  cuts(ctx, step, curRadian, annulus) {
    let stepWidth = 0.05; //间隔宽度-弧度
    let stepColor = 'white';  //间隔颜色
    ctx.beginPath();
    if (curRadian > Math.PI * 2 / annulus.cutNum * step - stepWidth && curRadian < Math.PI * 2 / annulus.cutNum * step + stepWidth) {// 弧度在间隔范围内进行动态绘制
      ctx.arc(annulus.x, annulus.y, annulus.radiusOuter, Math.PI * 2 / annulus.cutNum * step - stepWidth, curRadian);
      ctx.arc(annulus.x, annulus.y, annulus.radiusInner, curRadian, Math.PI * 2 / annulus.cutNum * step - stepWidth, true);
      ctx.setFillStyle(stepColor);
      ctx.fill();
    } else if (curRadian > Math.PI * 2 / annulus.cutNum * step + stepWidth) {// 超出部分完整绘制
      ctx.arc(annulus.x, annulus.y, annulus.radiusOuter, Math.PI * 2 / annulus.cutNum * step - stepWidth, Math.PI * 2 / annulus.cutNum * step + stepWidth);
      ctx.arc(annulus.x, annulus.y, annulus.radiusInner, Math.PI * 2 / annulus.cutNum * step + stepWidth, Math.PI * 2 / annulus.cutNum * step - stepWidth, true);
      ctx.setFillStyle(stepColor);
      ctx.fill();
    }
  },
  btnNext() {
    let curstep = this.data.step + 1;
    this.setData({
      step: curstep
    })
    this.draw('#eee', 'yellow', this.data.step);
  }
})