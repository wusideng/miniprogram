import { http } from '../../../service/http.service';

Page({
	
	/**
	 * 页面的初始数据
	 */
	data: {
		system: '',
		model: '',
		showAuth: false,
		imgsrc: 'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=7bcb659c9745d688a302b5a29cf91a23/2934349b033b5bb571dc8c5133d3d539b600bc12.jpg'
	},
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad (options) {
		this.getUserInfo();
    this.getAuthSetting();
	},
	
	
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow () {
		wx.getSetting({
			success: res => {
				console.log('res.authSetting[\'scope.userInfo\']', res.authSetting['scope.userInfo'], res);
				if (res.authSetting['scope.userInfo']) {
					this.setData({
						showAuth: true
					});
				}
			}
		});
	},
	
	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide () {
	
	},
	
	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload () {
	},
	
	
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage () {
	
	},
	getAuthSetting(){
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord()
            }
          })
        }
      }
    })
  },
	getUserInfo () {
		wx.getUserInfo({
			success: (res) => {
				console.log('getUserInfo:', res);
			}
		});
	},
	getSystemInfo () {
		wx.getSystemInfo({
			success: (res) => {
				this.setData({
					model: res.model,
					system: res.system
				});
			}
		});
	},
	getOpenId () {
		wx.login({
			success: (res) => {
				console.log('login:', res);
				let appid = 'wxd8b26f08f2550ad5';
        let secret = '690399e631899a666300be07c775da43';//便利村落
        // let appid = 'wx7346af117432df5e';
        // let secret = 'ee1816bf038bc732749305a6009c3879';//有利网       
				let js_code = res.code;
				let grant_type = 'authorization_code';
				wx.request({
					url: 'https://api.weixin.qq.com/sns/jscode2session',
					data: { appid: appid, secret: secret, js_code, grant_type },
					method: 'GET',
					success: (res) => {
						console.log('request:', res);
					}
				});
			}
		});
	},
	getCode () {
		wx.login({
			success: (res) => {
				console.log(res);
			}
		});
	},
	/**
	 * 获取用户信息
	 */
	userInfoHandler (e) {
		console.log('userInfoHandler:',e);
		this.getOpenId();
		console.log('errMsg:', e.detail.errMsg);
		console.log(e.detail.userInfo);
		console.log(e.detail.rawData);
		console.log('userInfoHandler:');
		wx.switchTab({
			url: '/pages/index/index'
		});
	},
	/**
	 * 提示下载app
	 */
	appDownLoad () {
		wx.previewImage({
			current: '/assets/img/WechatIMG71.jpeg.png', // 当前显示图片的http链接
			urls: [
				'https://visualstreet.cn/website/yl.png',
				'https://visualstreet.cn/website/gfxcxm.png',
				'https://visualstreet.cn/website/gfewm.png',
				'https://visualstreet.cn/website/visualstreet.png',
				'https://visualstreet.cn/website/blclg.png',
				'https://visualstreet.cn/website/1526554036.png',
				'https://visualstreet.cn/website/WechatIMG71.jpeg',
				'https://api.coink.top/WebApi/mm_reward_qrcode.png'] // 需要预览的图片http链接列表
		});
	},
	/**
	 * 获取二维码
	 */
	getQRCode () {
		const url = 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=10_IkVPS7jNuZIEIk7-26NQZR1lUKNVfyiiSNEZvsz0xTY7k6gnRsLtX2LSeAbili6N-2gfvWR8epMhbzwu6xliiBTe4qSuZwE5vEpZSagrP1qv3b3TXawhvvfpVII-ucQmGKKRKqDv3yX2pxCzQJBeACALEW';
		const param = {
			path: 'pages/index/index',
			width: 430
		};
		http.post(url, param).then((res) => {
			console.log('http.post.then:', res);
		});
	},
	userInfobind () {
		console.log('userInfobind');
	},
	getCopy (e) {
		wx.setClipboardData({
			data: 'data',
			success: function (res) {
				wx.getClipboardData({
					success: function (res) {
						console.log('getCopy', res.data); // data
					}
				});
			}
		});
	},
	getSystem (e) {
		wx.getSystemInfo({
			success: (res) => {
				console.log(res);
			}
		});
	}
});