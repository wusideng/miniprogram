// pages/demo/promise/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: '',
    arr: [
      { 'a': '3' },
      { 'b': 'bbc' },
      { 'c': '1' }],
    arr1: {
      hClientNonce: "430ab31cae0a1284",
      hClientVersion: "1.1.0",
      hExpireTime: 10000,
      hTimestamp: 1526967940731
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.toDeBug();
    this.toPromise().then((msg) => {
      this.setData({
        msg: msg
      })
      console.log(msg)
    });
  },
  toDeBug() {
    let self = this;
    let arr = Object.keys(this.data.arr1)
    let aaa = arr.map((item) => { 
      return self.data.arr1[item]; }).sort()
    console.log(arr)
    console.log('aaa:',aaa)
  },
  toReBug() {
    console.log(this.data.arr1)
    let arr1 = Object.keys(this.data.arr1).sort()
    console.log(arr1)
    let arr = Object.values(this.data.arr1).sort()
    console.log(arr)
  },
  toPromise() {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve("成功!"); //代码正常执行！
      }, 250);
    })
  }
})